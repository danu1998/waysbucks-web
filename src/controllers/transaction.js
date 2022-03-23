const {
  transaction,
  user,
  order,
  product,
  toping,
  topingorder,
} = require("../../models");
exports.addTransaction = async (req, res) => {
  const path = process.env.FILE_PATH;
  try {
    const { body, user } = req;
    const userId = user.id;

    const transactions = await transaction.create({
      ...body,
      imgpay: req.file.filename,
      status: "Waiting Approve",
      idUser: userId,
    });

    JSON.parse(body.products).map(async (item) => {
      const { idProduct, qty } = item;
      const orders = await order.create({
        idTransaction: transactions.id,
        idProduct: idProduct,
        qty: qty,
      });

      {
        item.topings.map(async (items) => {
          const idToping = items;
          const topings = await topingorder.create({
            idOrder: orders.id,
            idToping: idToping,
          });
        });
      }
    });

    res.status(201).send({
      status: "Success",
      data: {
        transactions,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await transaction.findAll({
      attributes: {
        exclude: ["idUser", "idTransaction", "createdAt", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: [
              "id",
              "idUser",
              "password",
              "status",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: order,
          as: "orders",
          attributes: {
            exclude: [
              "id",
              "idOrder",
              "idTransaction",
              "idProduct",
              "createdAt",
              "updatedAt",
            ],
          },
          include: [
            {
              model: product,
              as: "products",
              attributes: {
                exclude: ["id", "createdAt", "updatedAt"],
              },
            },
            {
              model: topingorder,
              as: "topingorders",
              attributes: {
                exclude: [
                  "id",
                  "topingId",
                  "idToping",
                  "idTransaction",
                  "createdAt",
                  "updatedAt",
                ],
              },
              include: [
                {
                  model: toping,
                  as: "topings",
                  attributes: {
                    exclude: ["id", "createdAt", "updatedAt"],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    res.send({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getUserTransaction = async (req, res) => {
  try {
    const { id } = req.user;
    const transactions = await transaction.findAll({
      where: {
        idUser: id,
      },
      attributes: {
        exclude: ["idUser", "idTransaction", "updatedAt"],
      },
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: [
              "id",
              "idUser",
              "password",
              "status",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: order,
          as: "orders",
          attributes: {
            exclude: [
              "id",
              "idOrder",
              "idTransaction",
              "idProduct",
              "createdAt",
              "updatedAt",
            ],
          },
          include: [
            {
              model: product,
              as: "products",
              attributes: {
                exclude: ["id", "createdAt", "updatedAt"],
              },
            },
            {
              model: topingorder,
              as: "topingorders",
              attributes: {
                exclude: [
                  "id",
                  "topingId",
                  "idToping",
                  "idTransaction",
                  "createdAt",
                  "updatedAt",
                ],
              },
              include: [
                {
                  model: toping,
                  as: "topings",
                  attributes: {
                    exclude: ["id", "createdAt", "updatedAt"],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    res.send({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.updateTransaction = async (req, res) => {
  const path = process.env.PATH_FILE;

  try {
    const { id } = req.params;
    const body = req.body;

    const newTransaction = {
      ...body,
    };

    console.log(req.body);

    await transaction.update(newTransaction, {
      where: {
        id,
      },
    });

    const transactions = await transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data: { transactions },
    });
  } catch (error) {
    // console.log(error)
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await transaction.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
    });
  }
};
