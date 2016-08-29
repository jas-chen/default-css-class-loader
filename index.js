const loaderUtils = require("loader-utils");

module.exports = function(source) {
  this.cacheable();

  const query = loaderUtils.parseQuery(this.query);
  const defaultName = query.name || 'root';

  const objStr = source.split('exports.locals =')[1].replace('};', '}');
  const obj = JSON.parse(objStr);

  if (!obj.hasOwnProperty(defaultName)) {
    return source;
  }

  const newObjStr = objStr.replace('"\n}', `",\n       	"toString": () => "${obj[defaultName]}"\n}`);
  return source.replace(objStr, newObjStr);

  // === before ===
  // exports.locals = {
  //      	"root": "root___1J7bD",
  //      	"_primary": "_primary___3xeN0",
  //      	"_danger": "_danger___palPu"
  // };

  // === after ===
  // exports.locals = {
  //      	"root": "root___1J7bD",
  //      	"_primary": "_primary___3xeN0",
  //      	"_danger": "_danger___palPu",
  //        "toString": () => "root___1J7bD"
  // };
};
