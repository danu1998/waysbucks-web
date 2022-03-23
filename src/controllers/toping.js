const { toping, user } = require("../../models");

exports.getTopings = async (req, res) => {
  try {
    let topings = await toping.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "email", "image"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    topings = JSON.parse(JSON.stringify(topings));
    topings = topings.map((item) => {
      return { ...item, image: process.env.FILE_PATH + item.image };
    });
    res.send({
      status: "Success",
      message: "Get All Data Toping Success",
      data: {
        topings,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed !!!",
      message: "Get Data Toping Failed !",
    });
  }
};
exports.getToping = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await toping.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: ["createdAt", "updatedAt", "password"],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = JSON.parse(JSON.stringify(data));
    data = {
      ...data,
      image: process.env.FILE_PATH + data.image,
    };
    res.send({
      status: "Success",
      message: "Get All Data Toping By Id Success",
      data,
    });
  } catch (err) {
    res.send({
      status: "Failed !!!",
      message: "Get Data Toping By Id Failed !",
    });
  }
};
exports.addToping = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      price: req.body.price,
      image: req.file.filename,
      idUser: req.user.id,
    };
    let newToping = await toping.create(data);
    let topingData = await toping.findOne({
      where: {
        id: newToping.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    topingData = JSON.parse(JSON.stringify(topingData));

    res.send({
      status: "Success",
      message: "Add Data Toping Success",
      data: {
        ...topingData,
        image: process.env.FILE_PATH + topingData.image,
      },
    });
  } catch (err) {
    res.send({
      status: "Failed !!!",
      message: "Add Data Toping Failed !",
    });
  }
};
exports.deleteToping = async (req, res) => {
  try {
    const { id } = req.params;
    await toping.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "Success",
      message: "Add Data Toping Success",
    });
  } catch (err) {
    res.send({
      status: "Failed !!!",
      message: "Delete Data Toping Failed !",
    });
  }
};
exports.updateToping = async (req, res) => {
  try {
    const { id } = req.params;

    // =============== || ==============
    const data = {
      name: req?.body?.name,
      price: req?.body?.price,
      image: req?.file?.filename,
      idUser: req?.user?.id,
    };
    // =============== || ==============

    await toping.update(data, {
      where: {
        id,
      },
    });

    // =============== || ==============
    res.send({
      status: "Success !!!",
      message: "Update Data Toping Success !",
      data: {
        id,
        data,
        image: req?.file?.filename,
      },
    });
  } catch (err) {
    res.send({
      status: "Failed !!!",
      message: "Update Data Toping Failed !",
    });
  }
};
