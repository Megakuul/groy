/**
 * @typedef {Object} Game
 * @property {string} version
 * @property {number} revision
 * @property {number} columns
 * @property {number} rows
 * @property {Object.<string, number>} indexes
 * @property {Block[]} blocks
 * 
 * @property {Object.<string, Player>} players
 */

/**
 * @typedef {Object} Player
 * @property {string} name
 */

/**
 * @typedef {Object} Block
 * @property {"static" | "dynamic"} type
 * @property {StaticBlock} static
 * @property {DynamicBlock} dynamic
 */

/**
 * @typedef {Object} StaticBlock
 * @property {"crystal" | "wood" | "iron" | "uranium"} type
 */

/**
 * @typedef {Object} DynamicBlock
 * @property {number} hitpoints
 * @property {string} owner
 * @property {number} level
 * @property {"town-hall" | "crystal-mine" | "iron-mine" | "cannon"} type
 * @property {TownHall} town_hall
 * @property {CrystalMine} crystal_mine
 * @property {IronMine} iron_mine
 * @property {Cannon} cannon
 */

/**
 * @typedef {Object} TownHall
 * @property {number} crystals
 */

/**
 * @typedef {Object} CrystalMine
 * @property {number} production
 */

/**
 * @typedef {Object} IronMine
 * @property {number} production
 */

/**
 * @typedef {Object} Cannon
 * @property {number} bullets
 */