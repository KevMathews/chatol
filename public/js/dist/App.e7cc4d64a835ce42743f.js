/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"App": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors~App"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/Chat.js":
/*!********************************!*\
  !*** ./src/components/Chat.js ***!
  \********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return Chat; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nfunction _templateObject8() {\n  const data = _taggedTemplateLiteral([\"\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\talign-items: flex-start;\\n\"]);\n\n  _templateObject8 = function _templateObject8() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _templateObject7() {\n  const data = _taggedTemplateLiteral([\"\\n\\tcursor: pointer;\\n\"]);\n\n  _templateObject7 = function _templateObject7() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _templateObject6() {\n  const data = _taggedTemplateLiteral([\"\\n\\theight: 10%;\\n\\twidth: 100%;\\n\"]);\n\n  _templateObject6 = function _templateObject6() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _templateObject5() {\n  const data = _taggedTemplateLiteral([\"\\n\\theight: 15vh;\\n\\twidth: 99.5%;\\n\\tborder-bottom: 3px solid #0083ff;\\n\\tborder-right: 3px solid #0083ff;\\n\\tborder-left: 3px solid #0083ff;\\n\\tborder-bottom-left-radius: 10px;\\n\\tborder-bottom-right-radius: 10px;\\n\"]);\n\n  _templateObject5 = function _templateObject5() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _templateObject4() {\n  const data = _taggedTemplateLiteral([\"\\n\\twidth: 99.5%;\\n\\theight: 75%;\\n\\toverflow: scroll;\\n\\tborder-bottom: 3px solid #0083ff;\\n\\tborder-left: 3px solid #0083ff;\\n\\tborder-right: 3px solid #0083ff;\\n\\tborder-top: 3px solid #0083ff;\\n\\tborder-top-left-radius: 10px;\\n\\tborder-top-right-radius: 10px;\\n\"]);\n\n  _templateObject4 = function _templateObject4() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _templateObject3() {\n  const data = _taggedTemplateLiteral([\"\\n\\theight: 100;\\n\\twidth: 85vw;\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\"]);\n\n  _templateObject3 = function _templateObject3() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _templateObject2() {\n  const data = _taggedTemplateLiteral([\"\\n\\theight: 100%;\\n\\twidth: 16vw;\\n\\n\\tmargin-left: 8px;\\n\\tpadding-left: 3px;\\n\\toverflow: scroll;\\n\"]);\n\n  _templateObject2 = function _templateObject2() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _templateObject() {\n  const data = _taggedTemplateLiteral([\"\\n\\theight: 95vh;\\n\\twidth: 100%;\\n\\tdisplay: flex;\\n\\tbackground-color: #fafafa;\\n\\tjustify-content: center;\\n\"]);\n\n  _templateObject = function _templateObject() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n\n\nconst rooms = ['General', 'Food', 'Health', 'Movies', 'Music', 'News', 'Places', 'Romance', 'Sports'];\nconst Container = styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"].div(_templateObject());\nconst SideBar = styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"].div(_templateObject2());\nconst ChatPanel = styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"].div(_templateObject3());\nconst BodyContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"].div(_templateObject4());\nconst TextBox = styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"].textarea(_templateObject5());\nconst ChannelInfo = styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"].div(_templateObject6());\nconst Row = styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"].div(_templateObject7());\nconst Messages = styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"].div(_templateObject8());\nfunction Chat(props) {\n  function renderRooms(room) {\n    const currentChat = {\n      chatName: room,\n      isChannel: true,\n      receiverId: ''\n    };\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Row, {\n      onClick: () => props.toggleChat(currentChat),\n      key: room\n    }, room);\n  }\n\n  function renderUser(user) {\n    if (user.id === props.yourId) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Row, {\n        key: user.id\n      }, \"You: \", user.username);\n    }\n\n    const currentChat = {\n      chatName: user.username,\n      isChannel: false,\n      receiverId: user.id\n    };\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Row, {\n      onClick: () => {\n        props.toggleChat(currentChat);\n      },\n      key: user.id\n    }, user.username);\n  }\n\n  function renderMessages(message, index) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      key: index\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n      className: \"messageSender\"\n    }, message.sender), \": \\xA0\\xA0\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n      className: \"messageText\"\n    }, message.content));\n  }\n\n  let body;\n\n  if (!props.currentChat.isChannel || props.connectedRooms.includes(props.currentChat.chatName)) {\n    body = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Messages, null, props.messages.map(renderMessages));\n  } else {\n    body = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n      onClick: () => props.joinRoom(props.currentChat.chatName)\n    }, \"Join the \", props.currentChat.chatName, \" Channel\");\n  }\n\n  function handleKeyPress(e) {\n    if (e.key === 'Enter') {\n      props.sendMessage();\n    }\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"liveChatDiv\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SideBar, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, \"Channels\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"hr\", {\n    className: \"sidePanelHr\"\n  }), rooms.map(renderRooms), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, \"All Users\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"hr\", {\n    className: \"sidePanelHr\"\n  }), props.allUsers.map(renderUser)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ChatPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ChannelInfo, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: \"chatChannelName\"\n  }, props.currentChat.chatName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    className: \"chatPageLogo\",\n    src: \"https://i.imgur.com/CzW2kzM.png\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BodyContainer, null, body), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TextBox, {\n    value: props.message,\n    onChange: props.handleMessageChange,\n    onKeyPress: handleKeyPress,\n    placeholder: \"say something...\"\n  }))));\n}\n\n//# sourceURL=webpack:///./src/components/Chat.js?");

/***/ }),

/***/ "./src/components/NavBar.js":
/*!**********************************!*\
  !*** ./src/components/NavBar.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n\n\n\nconst NavBar = props => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\", {\n    className: \"NavBar\"\n  }, props.routes.filter(item => !item.path.includes(':')).map((_ref) => {\n    let {\n      key,\n      path\n    } = _ref;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[/* Link */ \"b\"], {\n      key: key,\n      to: path\n    }, key);\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (NavBar);\n\n//# sourceURL=webpack:///./src/components/NavBar.js?");

/***/ }),

/***/ "./src/components/UsernameForm.js":
/*!****************************************!*\
  !*** ./src/components/UsernameForm.js ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return Form; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction Form(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"signInContainerDiv\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"signInTitleDiv\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"signInDiv\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    className: \"loginPageTitleImage\",\n    src: \"https://i.imgur.com/CzW2kzM.png\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    type: \"text\",\n    value: props.username,\n    onChange: props.onChange,\n    placeholder: \"Enter User Name...\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", null), \"\\xA0\\xA0\\xA0\\xA0\\xA0\\xA0\\xA0\\xA0\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    onClick: props.connect\n  }, \"Login to Chat\")))));\n}\n\n//# sourceURL=webpack:///./src/components/UsernameForm.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ \"./src/router/index.js\");\n/* harmony import */ var bootstrap_scss_bootstrap_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/scss/bootstrap.scss */ \"./node_modules/bootstrap/scss/bootstrap.scss\");\n/* harmony import */ var bootstrap_scss_bootstrap_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_scss_bootstrap_scss__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst app = document.getElementById('app');\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_router__WEBPACK_IMPORTED_MODULE_2__[/* default */ \"a\"], null), app);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/pages/About.js":
/*!****************************!*\
  !*** ./src/pages/About.js ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return About; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction About(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"AboutPage\"\n  }, \"Welcome to Kevin's super awesome site. I am such a good coder, you will be amazed etc...\");\n}\n\n//# sourceURL=webpack:///./src/pages/About.js?");

/***/ }),

/***/ "./src/pages/App.js":
/*!**************************!*\
  !*** ./src/pages/App.js ***!
  \**************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return App; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\nfunction App(props) {\n  const [isVisible, setIsVisible] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\n  const [isInvisible, setInvisible] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\n\n  const toggleConnectingToChatterOnline = () => {\n    setIsVisible(!isVisible);\n    setInvisible(!isInvisible);\n  };\n\n  const [blogs, setBlogs] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const titleInput = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n  const bodyInput = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    // Immediately Invoked Function Expression\n    _asyncToGenerator(function* () {\n      try {\n        const response = yield fetch('/api/blogs');\n        const data = yield response.json();\n        setBlogs(data);\n      } catch (error) {\n        console.error(error);\n      }\n    })();\n  }, []);\n\n  const handleSubmit = /*#__PURE__*/function () {\n    var _ref2 = _asyncToGenerator(function* (e) {\n      e.preventDefault();\n      const titleValue = titleInput.current.value;\n      const bodyValue = bodyInput.current.value;\n\n      try {\n        const response = yield fetch('/api/blogs', {\n          method: 'POST',\n          headers: {\n            'Content-Type': 'application/json'\n          },\n          body: JSON.stringify({\n            title: titleValue,\n            body: bodyValue\n          })\n        });\n        const data = yield response.json();\n        setBlogs([...blogs, data]);\n      } catch (error) {\n        console.error(error);\n      }\n    });\n\n    return function handleSubmit(_x) {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"AppPage\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"mainPageContainer\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"loginGifDiv\",\n    style: {\n      display: isVisible ? 'block' : 'none'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    src: \"https://i.imgur.com/mzjB1aq.gif\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"connectToChatterOnlineDiv\",\n    style: {\n      display: isInvisible ? 'none' : 'block'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    src: \"https://i.imgur.com/KWCr3oJ.png\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    className: \"mainPageConnectButton\",\n    onClick: toggleConnectingToChatterOnline\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, \"Connect to Chatter Online\")))));\n}\n\n//# sourceURL=webpack:///./src/pages/App.js?");

/***/ }),

/***/ "./src/pages/BlogPost.js":
/*!*******************************!*\
  !*** ./src/pages/BlogPost.js ***!
  \*******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return BlogPost; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\nfunction BlogPost(props) {\n  const [blog, setBlog] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({});\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    _asyncToGenerator(function* () {\n      try {\n        const response = yield fetch(\"/api/blogs/\".concat(props.match.params.id));\n        const data = yield response.json();\n        setBlog(data);\n      } catch (error) {\n        console.error(error);\n      }\n    })();\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, blog.title ? blog.title : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, blog.body ? blog.body : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[/* Link */ \"b\"], {\n    to: \"/\".concat(blog._id, \"/edit\")\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", null, \"Update this Blog Post\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", null, blog.comments && blog.comments.length ? blog.comments.map(comment => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n      key: comment._id\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, comment.name, \" says...\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, comment.message), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"small\", null, comment.createdAt));\n  }) : ''));\n}\n\n//# sourceURL=webpack:///./src/pages/BlogPost.js?");

/***/ }),

/***/ "./src/pages/Contact.js":
/*!******************************!*\
  !*** ./src/pages/Contact.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* unused harmony export default */\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction Contact(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"ContactPage\"\n  }, \"This is the \", props.page, \" page\");\n}\n\n//# sourceURL=webpack:///./src/pages/Contact.js?");

/***/ }),

/***/ "./src/pages/Forums.js":
/*!*****************************!*\
  !*** ./src/pages/Forums.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return Forums; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\nfunction Forums(props) {\n  const [blogs, setBlogs] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const titleInput = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n  const bodyInput = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    // Immediately Invoked Function Expression\n    _asyncToGenerator(function* () {\n      try {\n        const response = yield fetch('/api/blogs');\n        const data = yield response.json();\n        setBlogs(data);\n      } catch (error) {\n        console.error(error);\n      }\n    })();\n  }, []);\n\n  const handleSubmit = /*#__PURE__*/function () {\n    var _ref2 = _asyncToGenerator(function* (e) {\n      e.preventDefault();\n      const titleValue = titleInput.current.value;\n      const bodyValue = bodyInput.current.value;\n\n      try {\n        const response = yield fetch('/api/blogs', {\n          method: 'POST',\n          headers: {\n            'Content-Type': 'application/json'\n          },\n          body: JSON.stringify({\n            title: titleValue,\n            body: bodyValue\n          })\n        });\n        const data = yield response.json();\n        setBlogs([...blogs, data]);\n      } catch (error) {\n        console.error(error);\n      }\n    });\n\n    return function handleSubmit(_x) {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"AppPage\"\n  }, blogs.map(blog => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      key: blog._id\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[/* Link */ \"b\"], {\n      to: \"/\".concat(blog._id)\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", {\n      className: \"blogTitles\"\n    }, blog.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n      className: \"blogBody\"\n    }, blog.body));\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n    style: {\n      display: 'flex',\n      flexDirection: 'column'\n    },\n    onSubmit: handleSubmit\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, ' ', \"Title: \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    type: \"text\",\n    ref: titleInput\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, ' ', \"Body: \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    type: \"text\",\n    ref: bodyInput\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    type: \"submit\",\n    value: \"Create MicroBlog\"\n  })));\n}\n\n//# sourceURL=webpack:///./src/pages/Forums.js?");

/***/ }),

/***/ "./src/pages/Home.js":
/*!***************************!*\
  !*** ./src/pages/Home.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* unused harmony export default */\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction Home(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"HomePage\"\n  }, \"This is h the \", props.page, \" page\");\n}\n\n//# sourceURL=webpack:///./src/pages/Home.js?");

/***/ }),

/***/ "./src/pages/LiveChat.js":
/*!*******************************!*\
  !*** ./src/pages/LiveChat.js ***!
  \*******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return Home; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_UsernameForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/UsernameForm */ \"./src/components/UsernameForm.js\");\n/* harmony import */ var _components_Chat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Chat */ \"./src/components/Chat.js\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io-client */ \"./node_modules/socket.io-client/build/index.js\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! immer */ \"./node_modules/immer/dist/immer.esm.js\");\n\n\n\n\n\n\n\nconst initialMessagesState = {\n  General: [],\n  Arts: [],\n  Celebrities: [],\n  Food: [],\n  Health: [],\n  Jokes: [],\n  Javascript: [],\n  Movies: [],\n  Music: [],\n  News: [],\n  Places: [],\n  Romance: [],\n  Sports: []\n};\nfunction Home() {\n  const [username, setUsername] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [connected, setConnected] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\n  const [currentChat, setCurrentChat] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({\n    isChannel: true,\n    chatName: 'General',\n    receiverID: ''\n  });\n  const [connectedRooms, setConnectedRooms] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(['General']);\n  const [allUsers, setAllUsers] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const [messages, setMessages] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(initialMessagesState);\n  const [message, setMessage] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('');\n  const [file, setFile] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])();\n  const socketRef = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])();\n\n  function handleMessageChange(e) {\n    setMessage(e.target.value);\n  }\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    setMessage('');\n  }, [messages]);\n\n  function sendMessage() {\n    const payload = {\n      content: message,\n      to: currentChat.isChannel ? currentChat.chatName : currentChat.receiverID,\n      sender: username,\n      chatName: currentChat.chatName,\n      isChannel: currentChat.isChannel\n    };\n    socketRef.current.emit('send message', payload);\n    const newMessages = Object(immer__WEBPACK_IMPORTED_MODULE_4__[/* default */ \"a\"])(messages, draft => {\n      draft[currentChat.chatName].push({\n        sender: username,\n        content: message\n      });\n    });\n    setMessages(newMessages);\n  }\n\n  function roomJoinCallback(incomingMessages, room) {\n    const newMessages = Object(immer__WEBPACK_IMPORTED_MODULE_4__[/* default */ \"a\"])(messages, draft => {\n      draft[room] = incomingMessages;\n    });\n    setMessages(newMessages);\n  }\n\n  function joinRoom(room) {\n    const newConnectedRooms = Object(immer__WEBPACK_IMPORTED_MODULE_4__[/* default */ \"a\"])(connectedRooms, draft => {\n      draft.push(room);\n    });\n    socketRef.current.emit('join room', room, messages => roomJoinCallback(messages, room));\n    setConnectedRooms(newConnectedRooms);\n  }\n\n  function toggleChat(currentChat) {\n    if (!messages[currentChat.chatName]) {\n      const newMessages = Object(immer__WEBPACK_IMPORTED_MODULE_4__[/* default */ \"a\"])(messages, draft => {\n        draft[currentChat.chatName] = [];\n      });\n      setMessages(newMessages);\n    }\n\n    setCurrentChat(currentChat);\n  }\n\n  function handleChange(e) {\n    e.preventDefault();\n    setUsername(e.target.value);\n  }\n\n  function connect() {\n    setConnected(true);\n    socketRef.current = socket_io_client__WEBPACK_IMPORTED_MODULE_3___default.a.connect('/');\n    socketRef.current.emit('join server', username);\n    socketRef.current.emit('join room', 'General', messages => roomJoinCallback(messages, 'General'));\n    socketRef.current.on('new user', allUsers => {\n      setAllUsers(allUsers);\n    });\n    socketRef.current.on('new message', (_ref) => {\n      let {\n        content,\n        sender,\n        chatName\n      } = _ref;\n      setMessages(messages => {\n        const newMessages = Object(immer__WEBPACK_IMPORTED_MODULE_4__[/* default */ \"a\"])(messages, draft => {\n          if (draft[chatName]) {\n            draft[chatName].push({\n              content,\n              sender\n            });\n          } else {\n            draft[chatName] = [{\n              content,\n              sender\n            }];\n          }\n        });\n        return newMessages;\n      });\n    });\n  }\n\n  function selectFile(e) {\n    setMessage(e.target.files[0].name);\n    setFile(e.target.files[0]);\n  }\n\n  let body;\n\n  if (connected) {\n    body = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Chat__WEBPACK_IMPORTED_MODULE_2__[/* default */ \"a\"], {\n      message: message,\n      handleMessageChange: handleMessageChange,\n      sendMessage: sendMessage,\n      yourId: socketRef.current ? socketRef.current.id : '',\n      allUsers: allUsers,\n      joinRoom: joinRoom,\n      connectedRooms: connectedRooms,\n      currentChat: currentChat,\n      toggleChat: toggleChat,\n      selectFile: selectFile,\n      messages: messages[currentChat.chatName]\n    });\n  } else {\n    body = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_UsernameForm__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"], {\n      username: username,\n      onChange: handleChange,\n      connect: connect\n    });\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, body);\n} // const Page = styled.div`\n// \tdisplay: flex;\n// \theight: 95vh;\n// \twidth: 100%;\n// \talign-items: center;\n// \tbackground-color: #8fddfc;\n// \tflex-direction: column;\n// `;\n// const Container = styled.div`\n// \tdisplay: flex;\n// \tflex-direction: column;\n// \theight: 60vh;\n// \tmax-height: 500px;\n// \toverflow: auto;\n// \twidth: 800px;\n// \tbackground-color: white;\n// \tborder: 3px solid #444bff;\n// \tborder-radius: 10px;\n// \tpadding-bottom: 10px;\n// \tmargin-top: 25px;\n// `;\n// const TextArea = styled.textarea`\n// \twidth: 100%;\n// \theight: 100px;\n// \tborder: 3px solid #444bff;\n// \tborder-radius: 10px;\n// \tmargin-top: 10px;\n// \tpadding-left: 10px;\n// \tpadding-top: 10px;\n// \tfont-size: 17px;\n// \tbackground-color: white;\n// \toutline: none;\n// \tcolor: #004387;\n// \tletter-spacing: 1px;\n// \tline-height: 18px;\n// \t::placeholder {\n// \t\tcolor: #444bff;\n// \t}\n// `;\n// const Button = styled.button`\n// \tbackground-color: white;\n// \tborder: 3px solid #444bff;\n// \twidth: 100%;\n// \theight: 50px;\n// \tborder-radius: 10px;\n// \tcolor: #46516e;\n// \tfont-size: 17px;\n// `;\n// const Form = styled.form`\n// \twidth: 800px;\n// `;\n// const MyRow = styled.div`\n// \twidth: 100%;\n// \tdisplay: flex;\n// \tjustify-content: flex-start;\n// \tmargin-top: 5px;\n// `;\n// const MyMessage = styled.div`\n// \twidth: 90%;\n// \tbackground-color: transparent;\n// \tcolor: #004387;\n// \tpadding: 5px;\n// \tmargin-right: 5px;\n// \ttext-align: left;\n// `;\n// const PartnerRow = styled(MyRow)`\n// \tjustify-content: flex-start;\n// `;\n// const PartnerMessage = styled.div`\n// \twidth: 90%;\n// \tbackground-color: transparent;\n// \tcolor: red;\n// \tpadding: 5px;\n// \tmargin-left: 5px;\n// \ttext-align: left;\n// `;\n// export default function LiveChat(props) {\n// \t// return <div className=\"HomePage\">This is the {props.page} page</div>;\n// \t// }\n// \tconst [yourID, setYourID] = useState();\n// \tconst [messages, setMessages] = useState([]);\n// \tconst [message, setMessage] = useState('');\n// \tconst socketRef = useRef();\n// \tuseEffect(() => {\n// \t\tsocketRef.current = io.connect('/');\n// \t\tsocketRef.current.on('your id', id => {\n// \t\t\tsetYourID(id);\n// \t\t});\n// \t\tsocketRef.current.on('message', message => {\n// \t\t\tconsole.log('here');\n// \t\t\treceivedMessage(message);\n// \t\t});\n// \t}, []);\n// \tfunction receivedMessage(message) {\n// \t\tsetMessages(oldMsgs => [...oldMsgs, message]);\n// \t}\n// \tfunction sendMessage(e) {\n// \t\te.preventDefault();\n// \t\tconst messageObject = {\n// \t\t\tbody: message,\n// \t\t\tid: yourID\n// \t\t};\n// \t\tsetMessage('');\n// \t\tsocketRef.current.emit('send message', messageObject);\n// \t}\n// \tfunction handleChange(e) {\n// \t\tsetMessage(e.target.value);\n// \t}\n// \treturn (\n// \t\t<Page>\n// \t\t\t<Container>\n// \t\t\t\t{messages.map((message, index) => {\n// \t\t\t\t\tif (message.id === yourID) {\n// \t\t\t\t\t\treturn (\n// \t\t\t\t\t\t\t<MyRow key={index}>\n// \t\t\t\t\t\t\t\t<MyMessage>{message.body}</MyMessage>\n// \t\t\t\t\t\t\t</MyRow>\n// \t\t\t\t\t\t);\n// \t\t\t\t\t}\n// \t\t\t\t\treturn (\n// \t\t\t\t\t\t<PartnerRow key={index}>\n// \t\t\t\t\t\t\t<PartnerMessage>{message.body}</PartnerMessage>\n// \t\t\t\t\t\t</PartnerRow>\n// \t\t\t\t\t);\n// \t\t\t\t})}\n// \t\t\t</Container>\n// \t\t\t<Form onSubmit={sendMessage}>\n// \t\t\t\t<TextArea\n// \t\t\t\t\tvalue={message}\n// \t\t\t\t\tonChange={handleChange}\n// \t\t\t\t\tplaceholder=\"Say something...\"\n// \t\t\t\t/>\n// \t\t\t\t<Button>Send</Button>\n// \t\t\t</Form>\n// \t\t</Page>\n// \t);\n// }\n\n//# sourceURL=webpack:///./src/pages/LiveChat.js?");

/***/ }),

/***/ "./src/pages/UpdatePost.js":
/*!*********************************!*\
  !*** ./src/pages/UpdatePost.js ***!
  \*********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return UpdatePost; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\nfunction UpdatePost(props) {\n  const [blog, setBlog] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({\n    title: '',\n    body: ''\n  });\n  const [didDelete, setDidDelete] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\n  const titleInput = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n  const bodyInput = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    _asyncToGenerator(function* () {\n      try {\n        const response = yield fetch(\"/api/blogs/\".concat(props.match.params.id));\n        const data = yield response.json();\n        setBlog(data);\n      } catch (error) {\n        console.error(error);\n      }\n    })();\n  }, [blog, didDelete]);\n\n  const handleDelete = /*#__PURE__*/function () {\n    var _ref2 = _asyncToGenerator(function* (e) {\n      try {\n        const response = yield fetch(\"/api/blogs/\".concat(props.match.params.id), {\n          method: 'DELETE',\n          headers: {\n            'Content-Type': 'application/json'\n          }\n        });\n        const data = yield response.json();\n        setDidDelete(!didDelete);\n      } catch (error) {\n        console.error(error);\n      } finally {\n        window.location.assign('/');\n      }\n    });\n\n    return function handleDelete(_x) {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n\n  const handleSubmit = /*#__PURE__*/function () {\n    var _ref3 = _asyncToGenerator(function* (e) {\n      e.preventDefault();\n\n      try {\n        const response = yield fetch(\"/api/blogs/\".concat(props.match.params.id), {\n          method: 'PUT',\n          headers: {\n            'Content-Type': 'application/json'\n          },\n          body: JSON.stringify({\n            title: titleInput.current.value,\n            body: bodyInput.current.value\n          })\n        });\n        const data = yield response.json();\n        setBlog(data);\n      } catch (error) {\n        console.error(error);\n      }\n    });\n\n    return function handleSubmit(_x2) {\n      return _ref3.apply(this, arguments);\n    };\n  }();\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, blog.title ? blog.title : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, blog.body ? blog.body : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    onClick: handleDelete\n  }, \"Delete Blog Post\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", null, blog.comments && blog.comments.length ? blog.comments.map(comment => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n      key: comment._id\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, comment.name, \" says...\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, comment.message), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"small\", null, comment.createdAt));\n  }) : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n    style: {\n      display: 'flex',\n      flexDirection: 'column'\n    },\n    onSubmit: handleSubmit\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, ' ', \"Title:\", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    type: \"text\",\n    ref: titleInput,\n    defaultValue: blog.title\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, ' ', \"Body: \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    type: \"text\",\n    ref: bodyInput,\n    defaultValue: blog.body\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    type: \"submit\",\n    value: \"Update MicroBlog\"\n  })));\n}\n\n//# sourceURL=webpack:///./src/pages/UpdatePost.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_NavBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/NavBar */ \"./src/components/NavBar.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/esm/react-router.js\");\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes */ \"./src/router/routes.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\nconst AppRouter = props => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[/* BrowserRouter */ \"a\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_NavBar__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"], {\n    routes: _routes__WEBPACK_IMPORTED_MODULE_4__[/* default */ \"a\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[/* Switch */ \"c\"], null, _routes__WEBPACK_IMPORTED_MODULE_4__[/* default */ \"a\"].map((_ref) => {\n    let {\n      Component,\n      key,\n      path\n    } = _ref;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[/* Route */ \"a\"], {\n      key: key,\n      path: path,\n      component: props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _extends({\n        page: key\n      }, props))\n    });\n  })));\n};\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (AppRouter);\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/router/routes.js":
/*!******************************!*\
  !*** ./src/router/routes.js ***!
  \******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _pages_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/App */ \"./src/pages/App.js\");\n/* harmony import */ var _pages_About__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/About */ \"./src/pages/About.js\");\n/* harmony import */ var _pages_LiveChat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/LiveChat */ \"./src/pages/LiveChat.js\");\n/* harmony import */ var _pages_Contact__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pages/Contact */ \"./src/pages/Contact.js\");\n/* harmony import */ var _pages_BlogPost__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pages/BlogPost */ \"./src/pages/BlogPost.js\");\n/* harmony import */ var _pages_UpdatePost__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../pages/UpdatePost */ \"./src/pages/UpdatePost.js\");\n/* harmony import */ var _pages_Home__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../pages/Home */ \"./src/pages/Home.js\");\n/* harmony import */ var _pages_Forums__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../pages/Forums */ \"./src/pages/Forums.js\");\n\n\n\n\n\n\n\n\n\nconst routes = [{\n  Component: _pages_LiveChat__WEBPACK_IMPORTED_MODULE_3__[/* default */ \"a\"],\n  key: 'LiveChat',\n  path: '/LiveChat'\n}, {\n  Component: _pages_Forums__WEBPACK_IMPORTED_MODULE_8__[/* default */ \"a\"],\n  key: 'Forums',\n  path: '/Forums'\n}, {\n  Component: _pages_About__WEBPACK_IMPORTED_MODULE_2__[/* default */ \"a\"],\n  key: 'About',\n  path: '/about'\n}, {\n  Component: _pages_UpdatePost__WEBPACK_IMPORTED_MODULE_6__[/* default */ \"a\"],\n  key: 'UpdatePost',\n  path: '/:id/edit'\n}, {\n  Component: _pages_BlogPost__WEBPACK_IMPORTED_MODULE_5__[/* default */ \"a\"],\n  key: 'BlogPost',\n  path: '/:id'\n}, {\n  Component: _pages_App__WEBPACK_IMPORTED_MODULE_1__[/* default */ \"a\"],\n  key: 'Home',\n  path: '/'\n}];\n/* harmony default export */ __webpack_exports__[\"a\"] = (routes);\n\n//# sourceURL=webpack:///./src/router/routes.js?");

/***/ })

/******/ });