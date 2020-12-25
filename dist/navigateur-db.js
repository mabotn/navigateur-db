"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
1; /* eslint-disable @typescript-eslint/no-explicit-any  */
var NavigateurDB = function (dbName, collectionName, cb) {
    var request = window.indexedDB.open(dbName, Date.now());
    var db = null;
    function Guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    function errorHandler(query, reject, callback) {
        query.onerror = function (event) {
            if (callback) {
                callback(event, null);
            }
            reject(event);
        };
    }
    var collection = {
        Find: function (filters, options, callback) {
            return new Promise(function (resolve, reject) {
                var query = db.transaction([collectionName], 'readwrite').objectStore(collectionName).getAll();
                errorHandler(query, reject, callback);
                query.onsuccess = function (event) {
                    var filterKeys = Object.keys(filters);
                    var result = Array.isArray(event.target.result) && event.target.result.filter((function (row) {
                        if (filterKeys.length > 0) {
                            var isMatch = filterKeys.filter(function (key) {
                                if (options.caseInsensitive) {
                                    if (!options.equalMatch) {
                                        return String(row[key]).toLocaleLowerCase().indexOf(String(filters[key]).toLocaleLowerCase()) != -1;
                                    }
                                    else {
                                        return String(row[key]).toLocaleLowerCase() == String(filters[key]).toLocaleLowerCase();
                                    }
                                }
                                else {
                                    if (!options.equalMatch) {
                                        return String(row[key]).indexOf(String(filters[key])) != -1;
                                    }
                                    else {
                                        return String(row[key]) == String(filters[key]);
                                    }
                                }
                            }).length > 0;
                            return isMatch;
                        }
                        else {
                            return true;
                        }
                    })) || [];
                    if (options.onlyFirst) {
                        result = result[0] || null;
                    }
                    if (callback) {
                        callback(null, result);
                    }
                    resolve(result);
                };
            });
        },
        Insert: function (data, callback) {
            return new Promise(function (resolve, reject) {
                var result = __assign({ id: Guid() }, data);
                var query = db.transaction([collectionName], 'readwrite').objectStore(collectionName).add(result);
                errorHandler(query, reject, callback);
                query.onsuccess = function () {
                    if (callback) {
                        callback(null, result);
                    }
                    resolve(result);
                };
            });
        },
        Update: function (data, callback) {
            return new Promise(function (resolve, reject) {
                if (!('id' in data)) {
                    reject(new Error("id is a mandatory field"));
                }
                else {
                    var query = db.transaction([collectionName], 'readwrite').objectStore(collectionName).put(data);
                    errorHandler(query, reject, callback);
                    query.onsuccess = function () {
                        if (callback) {
                            callback(null, data);
                        }
                        resolve(data);
                    };
                }
            });
        },
        Delete: function (id, callback) {
            return new Promise(function (resolve, reject) {
                var query = db.transaction([collectionName], 'readwrite').objectStore(collectionName)["delete"](id);
                errorHandler(query, reject, callback);
                query.onsuccess = function (event) {
                    if (callback) {
                        callback(null, event.target.result);
                    }
                    resolve(event.target.result);
                };
            });
        }
    };
    return new Promise(function (resolve, reject) {
        request.onerror = function (event) {
            if (cb) {
                cb(event, null);
            }
            reject(event);
        };
        request.onupgradeneeded = function (event) {
            var upgradeDb = event.target.result;
            if (!upgradeDb.objectStoreNames.contains(collectionName)) {
                upgradeDb.createObjectStore(collectionName, { keyPath: 'id' });
            }
        };
        request.onsuccess = function (_event) {
            db = _event.target.result;
            db.onerror = function (event) {
                if (cb) {
                    cb(event, null);
                }
                reject(event);
            };
            if (cb) {
                cb(null, collection);
            }
            resolve(collection);
        };
    });
};
exports["default"] = NavigateurDB;
//# sourceMappingURL=navigateur-db.js.map