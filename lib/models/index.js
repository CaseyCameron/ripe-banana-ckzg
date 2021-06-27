import Studio from './Studio.js';
import Film from './Film.js';
import Actor from './Actor.js';
import Review from './Review.js';

Studio.hasMany(Film, {
  as: 'films'
});
Film.belongsTo(Studio);


Film.belongsToMany(Actor, { through: 'ActorFilms' });
Actor.belongsToMany(Film, { through: 'ActorFilms' });

Review.hasOne(Film, { as: 'films' });
Film.belongsTo(Review);
//Review.belongsTo(Film, { as: 'FilmRef', foreignKey: Film.id });
