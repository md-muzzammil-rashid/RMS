const mostSellingProduct1 = await UsersModel.aggregate(
    [
      {
        $match: {
          _id: req.user._id,
        },
      },
      {
        $unwind: {
          path: "$orders",
        },
      },
      {
        $unwind: {
          path: "$orders.items",
        },
      },
      {
        $group: {
          _id: "$orders.items.variants.variant",
          quantity: {
            $sum: "$orders.items.quantity",
          },
          itemDetail:{
            $addToSet:{
              
            variant: '$orders.items.variants.variant',
            itemName : '$orders.items.name',
            price: '$orders.items.variants.price'
            }
          }
        },
      },
      {
        $sort: {
          quantity: -1
        }
      },
      
        {
          $limit: 10
        }
      
    ]
  )