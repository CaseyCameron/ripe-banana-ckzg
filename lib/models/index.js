import Studio from './Studio.js';
import Film from './Film.js';
import Actor from './Actor.js';

Studio.hasMany(Film, {
  as: 'films'
});
Film.belongsTo(Studio);


Film.belongsToMany(Actor, { through: 'ActorFilms' });
Actor.belongsToMany(Film, { through: 'ActorFilms' });
