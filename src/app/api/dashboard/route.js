import dbConnect from "@/app/lib/dbConnect";


export async function GET() {

    const usersCollection = await dbConnect("users");
    const ordersCollection = await dbConnect("orders");
    const purchasesCollection = await dbConnect("purchasesItems");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // TOTAL COUNTS
    const users = await usersCollection
        .aggregate([{ $count: "totalUsers" }])
        .toArray();
    console.log(users)
    const orders = await ordersCollection
        .aggregate([{ $count: "totalOrders" }])
        .toArray();

    const purchases = await purchasesCollection
        .aggregate([{ $count: "totalPurchases" }])
        .toArray();

    // TODAY STATS
    const todayOrders = await ordersCollection
        .aggregate([
            { $match: { date: { $gte: today } } },
            { $count: "todayOrders" }
        ])
        .toArray();

    const todayPurchases = await purchasesCollection
        .aggregate([
            { $match: { createdAt: { $gte: today } } },
            { $count: "todayPurchases" }
        ])
        .toArray();

    // CHART DATA
    const orderChart = await ordersCollection
        .aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$date"
                        }
                    },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ])
        .toArray();

    const usersChart = await usersCollection.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$date" }
                },
                total: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } } // oldest to newest
    ]).toArray();

    return Response.json({
        totalUsers: users[0]?.totalUsers || 0,
        totalOrders: orders[0]?.totalOrders || 0,
        totalPurchases: purchases[0]?.totalPurchases || 0,
        todayOrders: todayOrders[0]?.todayOrders || 0,
        todayPurchases: todayPurchases[0]?.todayPurchases || 0,
        orderChart,
        usersChart
    });
}
