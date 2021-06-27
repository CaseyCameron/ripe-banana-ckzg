import Studio from './Studio.js';
import Film from './Film.js';
import Actor from './Actor.js';
import Review from './Review.js';
// import Sequelize from 'sequelize';
// import db from '../utils/db.js';

Studio.hasMany(Film, {
  as: 'films'
});
Film.belongsTo(Studio);


Film.belongsToMany(Actor, { through: 'ActorFilms' });
Actor.belongsToMany(Film, { through: 'ActorFilms' });

//Review.hasOne(Film);
// Film.belongsTo(Review);
//Review.belongsTo(Film, { as: 'FilmRef', foreignKey: Film.id });


// class ActorFilm extends Sequelize.Model {}

// ActorFilm.init(
//   {
//     MovieId: {
//       type: Sequelize.DataTypes.INTEGER,
//       references: {
//         model: Film, // 'Movies' would also work
//         key: 'id'
//       }
//     },
//     ActorId: {
//       type: Sequelize.DataTypes.INTEGER,
//       references: {
//         model: Actor, // 'Actors' would also work
//         key: 'id'
//       }
//     }
//   },

//   {
//     sequelize: db,
//     modelName: 'ActorFilm'
//   }
// );
