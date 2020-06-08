module.exports = (sequelize, DataTypes) => {

  const Entidade = sequelize.define('Entidade', {
    name: DataTypes.STRING,
    image: DataTypes.STRING(500),
    endereco: DataTypes.STRING,
    endereco2: DataTypes.STRING,
    estado: DataTypes.STRING,
    cidade: DataTypes.STRING,
    items: DataTypes.STRING,
  });

  return Entidade;
}