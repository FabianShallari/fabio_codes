(function() {
  var CateTree, array_cate_url, cateTrees,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CateTree = (function() {
    function CateTree(cates, helper) {
      this.cates = cates;
      this.helper = helper;
      this.getByRoute = __bind(this.getByRoute, this);
      this.warpInTree = __bind(this.warpInTree, this);
      this.tree = {
        cid: 0,
        subs: []
      };
      cates.forEach((function(_this) {
        return function(cate) {
          return _this.makeInTree(cate);
        };
      })(this));
      console.log(this.tree.subs);
    }

    CateTree.prototype.query = function(cid, tree) {
      var result, sub, _i, _len, _ref;
      if (tree.cid === cid) {
        return tree;
      }
      _ref = tree.subs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sub = _ref[_i];
        result = this.query(cid, sub);
        if (result) {
          return result;
        }
      }
      return null;
    };

    CateTree.prototype.makeInTree = function(obj) {
      var parent;
      if (this.query(obj._id, this.tree)) {
        return;
      }
      if (!obj.parent) {
        this.tree.subs.push(this.warpInTree(obj));
        return;
      }
      parent = this.query(obj.parent, this.tree);
      if (!parent) {
        parent = this.makeInTree(obj.parent);
      }
      return parent.subs.push(this.warpInTree(obj));
    };

    CateTree.prototype.warpInTree = function(obj) {
      return {
        cid: obj._id,
        name: obj.name,
        link: this.helper.url_for(obj.path),
        count: obj.length,
        subs: []
      };
    };

    CateTree.prototype.getByRoute = function(arrays) {
      var name, now, sub, _i, _j, _len, _len1, _ref;
      now = this.tree;
      for (_i = 0, _len = arrays.length; _i < _len; _i++) {
        name = arrays[_i];
        _ref = now.subs;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          sub = _ref[_j];
          if (name === sub.name) {
            now = sub;
          }
          break;
        }
      }
      return now;
    };

    return CateTree;

  })();

  array_cate_url = function(url) {
    var part, parts, result, _i, _len;
    parts = url.split('/');
    result = [];
    for (_i = 0, _len = parts.length; _i < _len; _i++) {
      part = parts[_i];
      if (part !== '' && part !== 'categories') {
        result.push(part);
      }
    }
    return result;
  };

  cateTrees = null;

  hexo.extend.helper.register('m_list_cates', function(url) {
    var arrays;
    if (!cateTrees) {
      cateTrees = new CateTree(this.site.categories, this);
    }
    arrays = [];
    if (url) {
      arrays = array_cate_url(url);
    }
    if (arrays.length === 0) {
      return cateTrees.tree.subs;
    } else {
      return cateTrees.getByRoute(arrays).subs;
    }
  });

  hexo.extend.helper.register('m_depth_cate', function(cates) {
    var result;
    result = {
      name: 'uncated'
    };
    cates.forEach((function(_this) {
      return function(cate) {
        return result = cate;
      };
    })(this));
    return {
      name: result.name,
      link: this.url_for(result.path),
      count: result.length
    };
  });

  hexo.extend.helper.register('m_list_tags', function(tags) {
    var result;
    if (!tags) {
      tags = this.site.tags;
    }
    result = [];
    tags.forEach((function(_this) {
      return function(tag) {
        return result.push({
          name: tag.name,
          link: _this.url_for(tag.path),
          count: tag.length
        });
      };
    })(this));
    return result;
  });

}).call(this);
