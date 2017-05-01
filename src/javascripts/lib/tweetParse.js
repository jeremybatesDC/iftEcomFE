// Tweet Parse!
// 'Borrowed' and tweeked from:
// http://www.simonwhatley.co.uk/examples/twitter/prototype/
// http://stackoverflow.com/questions/6549223/javascript-code-to-display-twitter-created-at-as-xxxx-ago
const TweetParse = function() {
    this.UrlUserHashtag = function(n_string) {
            String.prototype.parseURL = function() {
                return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
                    return url.link(url);
                });
            };
            String.prototype.parseUsername = function() {
                return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
                    var username = u.replace("@", "")
                    return u.link("http://twitter.com/" + username);
                });
            };

            String.prototype.parseHashtag = function() {
                return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
                    var tag = t.replace("#", "%23")
                    return t.link("https://twitter.com/search?q=" + tag);
                });
            };
            return n_string.parseURL().parseUsername().parseHashtag();
        },
        this.parseTimeAgo = function(n_string) {
            let K = function() {
                let a = navigator.userAgent;
                return {
                    ie: a.match(/MSIE\s([^;]*)/)
                }
            }();
            let user_date = new Date(),
              system_date = new Date(Date.parse(n_string));
            if (K.ie) {
                system_date = Date.parse(n_string.replace(/( \+)/, ' UTC$1'))
            }
            let diff = Math.abs((user_date - system_date) / 1000);
            if (diff <= 1) {
                return "just now";
            }
            if (diff < 20) {
                return diff + " seconds ago";
            }
            if (diff < 40) {
                return "half a minute ago";
            }
            if (diff < 60) {
                return "less than a minute ago";
            }
            if (diff <= 90) {
                return "one minute ago";
            }
            if (diff <= 3540) {
                return Math.round(diff / 60) + " minutes ago";
            }
            if (diff <= 5400) {
                return "1 hour ago";
            }
            if (diff <= 86400) {
                return Math.round(diff / 3600) + " hours ago";
            }
            if (diff <= 129600) {
                return "1 day ago";
            }
            if (diff < 604800) {
                return Math.round(diff / 86400) + " days ago";
            }
            if (diff <= 777600) {
                return "1 week ago";
            }
            let t_month = system_date.getUTCMonth() + 1,
              t_day = system_date.getUTCDate(),
              t_year = system_date.getUTCFullYear(),
              newdate = t_month + "/" + t_day + "/" + t_year;

            return "on " + newdate;

        }
}
module.exports = TweetParse;
