/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/pathfind.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/defaults.ts":
/*!*************************!*\
  !*** ./src/defaults.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return defaults; });\n/* harmony import */ var _voids__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./voids */ \"./src/voids.ts\");\n\r\n//// CONFIGURATION PROPS WITH VOIDS ////\r\nclass Voids {\r\n    generateBorderMap(x, y) {\r\n        const borderMap = [];\r\n        for (let i = 0; i < y; i++) {\r\n            const rows = [];\r\n            for (let j = 0; j < x; j++)\r\n                rows.push(0);\r\n            borderMap.push(rows);\r\n        }\r\n        return borderMap;\r\n    }\r\n    resetBorders(arr) {\r\n        for (let i in arr) {\r\n            for (let j in arr[i])\r\n                arr[i][j] = 0;\r\n        }\r\n    }\r\n    generateRandomBorders(arr, maxBordes = 3) {\r\n        const { length: height } = arr;\r\n        const { length: width } = arr[0];\r\n        for (let i = 0; i < maxBordes; i++) {\r\n            let x;\r\n            let y;\r\n            let repeats = 0;\r\n            do {\r\n                if (repeats > 5)\r\n                    break;\r\n                y = Object(_voids__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(0, height);\r\n                x = Object(_voids__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(0, width);\r\n            } while (arr[y][x] == -1);\r\n            if (repeats > 5) {\r\n                //// add some kind of validation\r\n                break;\r\n            }\r\n            arr[y][x] = -1;\r\n        }\r\n    }\r\n}\r\nclass defaults {\r\n}\r\ndefaults.size = {\r\n    x: 9,\r\n    y: 9\r\n};\r\ndefaults.maxBorders = 3;\r\ndefaults.colors = [\r\n    'red',\r\n    'darkgreen',\r\n    'papayawhip',\r\n    'blue',\r\n    'yellow',\r\n    'purple',\r\n    '#111532'\r\n];\r\ndefaults.allSides = [\r\n    { x: 0, y: 1 },\r\n    { x: 1, y: 1 },\r\n    { x: 1, y: 0 },\r\n    { x: 1, y: -1 },\r\n    { x: 0, y: -1 },\r\n    { x: -1, y: -1 },\r\n    { x: -1, y: 0 },\r\n    { x: -1, y: 1 },\r\n];\r\ndefaults.voids = new Voids;\r\n// export default {\r\n//     size : {\r\n//         x : 9,\r\n//         y : 9\r\n//     },\r\n//     /// max borders and max ball count to draw\r\n//     maxBorders : 3,\r\n//     colors : [\r\n//         'red',\r\n//         'darkgreen',\r\n//         'papayawhip',\r\n//         'blue',\r\n//         'yellow',\r\n//         'purple',\r\n//         '#111532'\r\n//     ],\r\n//     allSides : [\r\n//         { x : 0,  y : 1  },\r\n//         { x : 1,  y : 1  },\r\n//         { x : 1,  y : 0  },\r\n//         { x : 1,  y : -1 },\r\n//         { x : 0,  y : -1 },\r\n//         { x : -1, y : -1 },\r\n//         { x : -1, y : 0  },\r\n//         { x : -1, y : 1  },\r\n//     ],\r\n//     voids : {        \r\n//         generateBorderMap : (x : number, y : number) : number[][] => {\r\n//             const borderMap = []\r\n//             for ( let i : number = 0; i < y; i++ ){\r\n//                 const rows = []\r\n//                 for (let j : number = 0; j < x ; j++)\r\n//                     rows.push(0)\r\n//                 borderMap.push(rows)\r\n//             }\r\n//             return borderMap\r\n//         },\r\n//         resetBorders : ( arr : any[] ) : void => {\r\n//             for ( let i in arr ) {\r\n//                 for (let j in arr[i])\r\n//                     arr[i][j] = 0\r\n//             }\r\n//         },\r\n//         generateRandomBorders : ( arr : number[][], maxBordes : number = 3 ) : void => {\r\n//             const { length : height } = arr\r\n//             const { length : width } = arr[0]\r\n//             for ( let i = 0; i < maxBordes; i++ ) {\r\n//                 let x : number\r\n//                 let y : number\r\n//                 let repeats = 0\r\n//                 do {\r\n//                     if (repeats > 5)\r\n//                         break\r\n//                     y = getRandom( 0, height )\r\n//                     x = getRandom( 0, width )\r\n//                 } while ( arr[ y ][ x ] == -1 )\r\n//                 if (repeats > 5) {\r\n//                     //// add some kind of validation\r\n//                     break\r\n//                 }\r\n//                 arr[ y ][ x ] = -1\r\n//             }\r\n//         },\r\n//     },\r\n// }\r\n\n\n//# sourceURL=webpack:///./src/defaults.ts?");

/***/ }),

/***/ "./src/main/pathfind.ts":
/*!******************************!*\
  !*** ./src/main/pathfind.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pathfind_Matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pathfind/Matrix */ \"./src/pathfind/Matrix.ts\");\nconsole.log('loaded : pathfind.ts');\r\n\r\n//// EXAMPLE UTILITIES ////\r\nconst generateBorderMap = (x, y) => {\r\n    const borderMap = [];\r\n    for (let i = 0; i < y; i++) {\r\n        const rows = [];\r\n        for (let j = 0; j < x; j++)\r\n            rows.push(0);\r\n        borderMap.push(rows);\r\n    }\r\n    return borderMap;\r\n};\r\nconst resetBorders = (arr) => {\r\n    for (let i in arr) {\r\n        for (let j in arr[i])\r\n            arr[i][j] = 0;\r\n    }\r\n};\r\nconst generateRandomBorders = (arr, maxBordes) => {\r\n    const { length: height } = arr;\r\n    const { length: width } = arr[0];\r\n    for (let i = 0; i < maxBordes; i++)\r\n        arr[getRandom(0, height)][getRandom(0, width)] = -1;\r\n};\r\nconst getRandom = (min, max) => {\r\n    min = Math.ceil(min);\r\n    max = Math.floor(max);\r\n    return Math.floor(Math.random() * (max - min)) + min;\r\n};\r\nconst size = 7;\r\nconst randomCount = 12;\r\nconst borders = generateBorderMap(size, size);\r\ngenerateRandomBorders(borders, randomCount);\r\nconsole.table(borders);\r\nconst matrix = new _pathfind_Matrix__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n    width: size,\r\n    height: size,\r\n    generateHtml: true,\r\n    borders: borders,\r\n});\r\nlet step = 1;\r\nlet minStep = 1;\r\nlet maxStep = 3;\r\nlet isAlreadyClicked = false;\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    console.log(matrix.html);\r\n    document.getElementById('board').appendChild(matrix.html);\r\n    matrix.addEventListener('click', (e, that) => {\r\n        console.log(that.x, that.y);\r\n        console.log(step);\r\n        console.log(that);\r\n        if (!isAlreadyClicked && !that.isBorder) {\r\n            // isAlreadyClicked = true\r\n            switch (step) {\r\n                case 1:\r\n                    matrix.start = that;\r\n                    that.classList.add('matrix__field--start');\r\n                    step = 2;\r\n                    break;\r\n                case 2:\r\n                    matrix.end = that;\r\n                    that.classList.add('matrix__field--end');\r\n                    // const { checked, path } = matrix.findPath()\r\n                    const { path, checked } = matrix.findPath();\r\n                    console.log(path);\r\n                    try {\r\n                        for (const field of checked) {\r\n                            field.classList.add('matrix__field--checked');\r\n                        }\r\n                        for (let i in path) {\r\n                            const node = matrix.find(path[i]);\r\n                            node.classList.add('matrix__field--path');\r\n                        }\r\n                    }\r\n                    catch (error) {\r\n                        console.warn(error);\r\n                    }\r\n                    step = 3;\r\n                    break;\r\n                case 3:\r\n                    resetBorders(borders);\r\n                    generateRandomBorders(borders, randomCount);\r\n                    matrix.borders = borders;\r\n                    matrix.reset();\r\n                    step = 1;\r\n                    break;\r\n                default:\r\n                    // step = 1\r\n                    break;\r\n            }\r\n            isAlreadyClicked = false;\r\n            // step = step >= maxStep ? minStep : step + 1\r\n        }\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack:///./src/main/pathfind.ts?");

/***/ }),

/***/ "./src/pathfind/Matrix.ts":
/*!********************************!*\
  !*** ./src/pathfind/Matrix.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Matrix; });\n/* harmony import */ var _voids__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../voids */ \"./src/voids.ts\");\n/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node */ \"./src/pathfind/Node.ts\");\nconsole.log('loaded : Matrix.ts');\r\n\r\n\r\nclass Matrix {\r\n    //// MAIN ////\r\n    constructor(props) {\r\n        //// VARS ////\r\n        /// board size ///\r\n        this._height = 1;\r\n        this._width = 1;\r\n        /// html board ///\r\n        this._html = {\r\n            generate: false,\r\n            main: document.createElement('div')\r\n        };\r\n        this._width = props.width || this._width;\r\n        this._height = props.height || this._height;\r\n        this._html.generate = props.generateHtml || this._html.generate;\r\n        this._borders = props.borders || this._borders;\r\n        this._init();\r\n    }\r\n    //// VOIDS ////\r\n    _init() {\r\n        this._fields = [];\r\n        const { _width, _height } = this;\r\n        for (let i = 0; i < _width; i++) {\r\n            const fieldRow = [];\r\n            for (let j = 0; j < _height; j++) {\r\n                fieldRow.push(new _Node__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\r\n                    x: j,\r\n                    y: i,\r\n                    generate: this._html.generate\r\n                }));\r\n            }\r\n            this._fields.push(fieldRow);\r\n        }\r\n        this.reset();\r\n        if (this._html.generate)\r\n            this.generateHtml();\r\n    }\r\n    //// RESET AND REFRESH ////\r\n    reset() {\r\n        for (const row of this._fields) {\r\n            for (const child of row) {\r\n                child.reset();\r\n            }\r\n        }\r\n        this.resetBorders();\r\n    }\r\n    resetBorders() {\r\n        const fields = this._fields;\r\n        const borders = this._borders;\r\n        for (let i in borders) {\r\n            for (let j in borders[i]) {\r\n                fields[i][j].isBorder = !!borders[i][j];\r\n                if (this._html.generate)\r\n                    fields[i][j].reset();\r\n            }\r\n        }\r\n    }\r\n    //// HTML ////\r\n    generateHtml() {\r\n        /// add class ///\r\n        this.html.classList.add('matrix');\r\n        /// append ///\r\n        for (const row of this._fields)\r\n            for (const child of row)\r\n                this.html.appendChild(child.html);\r\n        this.html.style.gridTemplateColumns = `repeat(${this._fields.length}, auto)`;\r\n    }\r\n    addEventListener(event, callback) {\r\n        for (const row of this._fields)\r\n            for (const child of row)\r\n                child.addEventListener(event, callback);\r\n    }\r\n    //// PATHFINDING ////\r\n    findPath(_start = this._start, _end = this._end, maximum = Infinity) {\r\n        // console.log(_start, _end)\r\n        /// translate positions to nodes ///\r\n        if (_start.x != undefined || _start.y != undefined)\r\n            _start = this.find(_start);\r\n        if (_end.x != undefined || _end.y != undefined)\r\n            _end = this.find(_end);\r\n        let openList = [_start];\r\n        let closedList = [];\r\n        let result = {};\r\n        let repeats = 0;\r\n        let allChildren = [];\r\n        while (openList.length != 0) {\r\n            repeats++;\r\n            /// get current node ///\r\n            const currentNode = openList.reduce((min, field) => min.f < field.f\r\n                ? min\r\n                : field);\r\n            openList = Object(_voids__WEBPACK_IMPORTED_MODULE_0__[\"reduceArr\"])(openList, currentNode);\r\n            closedList.push(currentNode);\r\n            /// found the goal ///\r\n            if (Object(_voids__WEBPACK_IMPORTED_MODULE_0__[\"compareObj\"])(currentNode.position, _end.position)) {\r\n                const path = [];\r\n                // console.log(currentNode, 'currentNode')\r\n                let current = currentNode.position;\r\n                let r = 0;\r\n                while (!Object(_voids__WEBPACK_IMPORTED_MODULE_0__[\"compareObj\"])(current, _start.position)) {\r\n                    let next = this.getNode(current).parent;\r\n                    if (Object(_voids__WEBPACK_IMPORTED_MODULE_0__[\"compareObj\"])(next, current))\r\n                        break;\r\n                    path.push(current);\r\n                    current = next;\r\n                }\r\n                result = {\r\n                    // checked : [ ...closedList, ...openList ],\r\n                    checked: Object(_voids__WEBPACK_IMPORTED_MODULE_0__[\"join\"])(closedList, openList),\r\n                    path: path.reverse()\r\n                };\r\n                break;\r\n            }\r\n            /// generate children ///\r\n            const children = this.getNeighbours(currentNode.position);\r\n            // allChildren = [ ...allChildren, ...children ]\r\n            allChildren = Object(_voids__WEBPACK_IMPORTED_MODULE_0__[\"join\"])(allChildren, children);\r\n            for (const childP of children) {\r\n                // console.log(childP)\r\n                const child = this.getNode(childP);\r\n                if (closedList.filter(closed => closed.x == child.x && closed.y == child.y).length)\r\n                    continue;\r\n                /// set f, g and h\r\n                child.g = currentNode.g + 1; // zmienic, jeśli trzeba\r\n                child.h = this.distance(child.position, _end.position);\r\n                child.f = child.g + child.h;\r\n                /// CHild is alredy in openList\r\n                if (openList.filter(open => open.x == child.x && open.y == child.y).length) {\r\n                    const max = Math.max.apply(Math, openList.map(function (o) {\r\n                        return o.g;\r\n                    }));\r\n                    if (child.g > max)\r\n                        continue;\r\n                }\r\n                // add the child to the openlist\r\n                openList.push(child);\r\n            }\r\n        }\r\n        return result;\r\n    }\r\n    getNeighbours(position) {\r\n        const finalResult = [];\r\n        const result = [];\r\n        const neighbours = [\r\n            { x: 0, y: -1 },\r\n            { x: 1, y: 0 },\r\n            { x: 0, y: 1 },\r\n            { x: -1, y: 0 }\r\n        ];\r\n        for (const neighbour of neighbours) {\r\n            const currentPosition = this.translate(position, neighbour);\r\n            if (this.isOnBoard(currentPosition) && !this.isAlreadyCounted(currentPosition) && !this.isBorder(currentPosition))\r\n                result.push(currentPosition);\r\n        }\r\n        for (const neighbour of result) {\r\n            const { x, y } = neighbour;\r\n            this._fields[y][x].parent = position;\r\n            finalResult.push(this._fields[y][x]);\r\n        }\r\n        return finalResult;\r\n    }\r\n    //// SUPPORTING METHODS ////\r\n    distance(from, to) {\r\n        const { pow } = Math;\r\n        return pow(from.x - to.x, 2) + pow(from.y - to.y, 2);\r\n    }\r\n    find(pos) {\r\n        return this._fields[pos.y][pos.x];\r\n    }\r\n    translate(pos, translation) {\r\n        const clone = Object(_voids__WEBPACK_IMPORTED_MODULE_0__[\"cloneObj\"])(pos);\r\n        clone.x += +translation.x;\r\n        clone.y += +translation.y;\r\n        return clone;\r\n    }\r\n    //// BOOLEANS ////\r\n    isOnBoard(position) {\r\n        if (position.x < 0)\r\n            return false;\r\n        if (position.x >= this._fields.length)\r\n            return false;\r\n        if (position.y < 0)\r\n            return false;\r\n        if (position.y >= this._fields[0].length)\r\n            return false;\r\n        return true;\r\n    }\r\n    isAlreadyCounted(position) {\r\n        return this.find(position).f > 0;\r\n    }\r\n    isBorder(position) {\r\n        const { x, y } = position;\r\n        return this._borders[y][x] == -1;\r\n    }\r\n    getNode(position) {\r\n        return this._fields[position.y][position.x];\r\n    }\r\n    //// SETTERS ////\r\n    set height(height) {\r\n        this._height = height;\r\n    }\r\n    set width(width) {\r\n        this._width = width;\r\n    }\r\n    set borders(borders) {\r\n        this._borders = borders;\r\n    }\r\n    set start(start) {\r\n        this._start = start;\r\n    }\r\n    set end(end) {\r\n        this._end = end;\r\n    }\r\n    //// GETTERS ////\r\n    get html() {\r\n        return this._html.main;\r\n    }\r\n    get height() { return this._height; }\r\n    get width() { return this._width; }\r\n    get fields() { return this._fields; }\r\n    get borders() { return this._borders; }\r\n    get start() { return this._start; }\r\n    get end() { return this._end; }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/pathfind/Matrix.ts?");

/***/ }),

/***/ "./src/pathfind/Node.ts":
/*!******************************!*\
  !*** ./src/pathfind/Node.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PathNode; });\n/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../defaults */ \"./src/defaults.ts\");\nconsole.log('loaded : Node.ts');\r\n\r\nclass PathNode {\r\n    //// MAIN ////\r\n    constructor(props) {\r\n        //// PRIVATE VARS ////\r\n        /// distance and heuristic ///\r\n        this._g = 0;\r\n        this._h = 0;\r\n        /// final cost ///\r\n        this._f = 0;\r\n        /// node position ///\r\n        this._position = {\r\n            x: 0,\r\n            y: 0\r\n        };\r\n        /// is already fill ///\r\n        this._isBorder = false;\r\n        //// HTML ////\r\n        this._html = {\r\n            generate: false,\r\n            main: document.createElement('div'),\r\n            g: document.createElement('div'),\r\n            h: document.createElement('div'),\r\n            f: document.createElement('div'),\r\n            ball: document.createElement('div')\r\n        };\r\n        /// ///\r\n        this._ball = {\r\n            color: -1\r\n        };\r\n        this._position = props.position || {\r\n            x: props.x || this._position.x,\r\n            y: props.y || this._position.y\r\n        };\r\n        this._html.generate = props.generate || this._html.generate;\r\n        this._parent = props.parent;\r\n        // console.log(this._html.generate)\r\n        if (this._html.generate)\r\n            this.generateHtml();\r\n    }\r\n    //// VOIDS ////\r\n    reset() {\r\n        this.g = 0;\r\n        this.h = 0;\r\n        this.f = 0;\r\n        this._parent = undefined;\r\n        if (this._html.generate)\r\n            this.resetHtml();\r\n    }\r\n    //// HTML VOIDS ////\r\n    generateHtml() {\r\n        this._html.g.classList.add('matrix__g');\r\n        this._html.h.classList.add('matrix__h');\r\n        this._html.f.classList.add('matrix__f');\r\n        this._html.ball.classList.add('matrix__ball');\r\n        this._html.main.classList.add('matrix__field');\r\n        this.html.appendChild(this._html.g);\r\n        this.html.appendChild(this._html.h);\r\n        this.html.appendChild(this._html.f);\r\n        this.html.appendChild(this._html.ball);\r\n        this.reset();\r\n    }\r\n    resetHtml() {\r\n        this.html.className = \"matrix__field\";\r\n        if (this.isBorder) {\r\n            this.html.classList.add('matrix__field--border');\r\n            this._html.ball.classList.add('matrix__ball--show');\r\n            this.color = this._ball.color;\r\n            // this._html.ball.style.backgroundColor = defaults.colors[ this._ball.color ]\r\n        }\r\n        else {\r\n            this._html.ball.classList.remove('matrix__ball--show');\r\n        }\r\n    }\r\n    addEventListener(event, callback) {\r\n        this.html.addEventListener(event, e => {\r\n            callback(e, this);\r\n        });\r\n    }\r\n    //// GETTERS ////\r\n    get html() {\r\n        return this._html.main;\r\n    }\r\n    get parent() { return this._parent; }\r\n    get position() { return this._position; }\r\n    get positionJSON() { return JSON.stringify(this._position); }\r\n    get x() { return this._position.x; }\r\n    get y() { return this._position.y; }\r\n    get g() { return this._g; }\r\n    get h() { return this._h; }\r\n    get f() { return this._f; }\r\n    get isBorder() { return this._isBorder; }\r\n    get classList() { return this.html.classList; }\r\n    get ball() { return this._ball; }\r\n    get color() { return this._ball.color; }\r\n    //// SETTERS ////\r\n    set parent(v) { this._parent = v; }\r\n    set x(v) { this._position.x = v; }\r\n    set y(v) { this._position.y = v; }\r\n    set g(v) {\r\n        this._g = v;\r\n        if (this._html.generate)\r\n            this._html.g.innerHTML = `${v}`;\r\n    }\r\n    set h(v) {\r\n        this._h = v;\r\n        if (this._html.generate)\r\n            this._html.h.innerHTML = `${v}`;\r\n    }\r\n    set f(v) {\r\n        this._f = v;\r\n        if (this._html.generate)\r\n            this._html.f.innerHTML = `${v}`;\r\n    }\r\n    set isBorder(v) {\r\n        this._isBorder = v;\r\n    }\r\n    set color(v) {\r\n        let color = v >= 0 && v < _defaults__WEBPACK_IMPORTED_MODULE_0__[\"default\"].colors.length\r\n            ? _defaults__WEBPACK_IMPORTED_MODULE_0__[\"default\"].colors[v]\r\n            : \"\";\r\n        if (color) {\r\n            this._html.ball.style.filter = `drop-shadow( 4px 4px 0 ${color})`;\r\n        }\r\n        else {\r\n            this.isBorder = false;\r\n            this._html.ball.style.filter = '';\r\n        }\r\n        this._html.ball.style.backgroundColor = color;\r\n        this._ball.color = v;\r\n    }\r\n    set ball(v) {\r\n        if (this.isBorder || v.color < 0 && v.color >= _defaults__WEBPACK_IMPORTED_MODULE_0__[\"default\"].colors.length) {\r\n            this._ball = { color: -1 };\r\n            this._html.ball.classList.remove('matrix__ball--show');\r\n            // this._html.ball.classList.remove('matrix__ball')\r\n            this._html.ball.style.backgroundColor = '';\r\n            this._html.ball.style.filter = '';\r\n        }\r\n        else {\r\n            // this._html.ball.classList.add('matrix__ball')\r\n            this._html.ball.classList.add('matrix__ball--show');\r\n            //// UNCOMMENT THIS IF SMTH GOES WRONG ////\r\n            // this.color = v.color\r\n            // const color =  defaults.colors[v.color]\r\n            // this._html.ball.style.backgroundColor = color\r\n            // this._html.ball.style.filter = `drop-shadow( 4px 4px 0 ${color})`\r\n        }\r\n        this.color = v.color;\r\n        this._ball = Object.assign({}, v);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/pathfind/Node.ts?");

/***/ }),

/***/ "./src/voids.ts":
/*!**********************!*\
  !*** ./src/voids.ts ***!
  \**********************/
/*! exports provided: getRandom, reduceArr, compareObj, join, cloneObj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRandom\", function() { return getRandom; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reduceArr\", function() { return reduceArr; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compareObj\", function() { return compareObj; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"join\", function() { return join; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cloneObj\", function() { return cloneObj; });\nconsole.log('loaded : voids.ts');\r\nconst getRandom = (min, max) => {\r\n    min = Math.ceil(min);\r\n    max = Math.floor(max);\r\n    return Math.floor(Math.random() * (max - min)) + min;\r\n};\r\nconst reduceArr = (arr, item) => {\r\n    const index = arr.indexOf(item);\r\n    // console.log( 'index', index)\r\n    if (index > -1)\r\n        arr.splice(index, 1);\r\n    return arr;\r\n};\r\nconst compareObj = (first, second) => {\r\n    return JSON.stringify(first) == JSON.stringify(second);\r\n};\r\nconst join = (first, second) => {\r\n    const result = [];\r\n    first.filter(v => result.push(v));\r\n    second.filter(v => result.push(v));\r\n    return result;\r\n};\r\nconst cloneObj = (obj) => JSON.parse(JSON.stringify(obj));\r\n\n\n//# sourceURL=webpack:///./src/voids.ts?");

/***/ })

/******/ });