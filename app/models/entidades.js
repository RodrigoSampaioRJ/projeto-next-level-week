module.exports = (sequelize, DataTypes) => {
    const Entidades = sequelize.define('Entidades', {
      name: DataTypes.STRING,
      endereco: DataTypes.STRING,
      estado: DataTypes.STRING,
      endereco2: DataTypes.STRING,
      cidade: DataTypes.STRING,
      image: DataTypes.STRING,
    });
  
    return Entidades;
  }