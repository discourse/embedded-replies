import { withPluginApi } from "discourse/lib/plugin-api";
import DiscourseURL from "discourse/lib/url";

export default {
  name: "reply-to-tab",

  initialize(container) {
    withPluginApi("0.8.7", (api) => {
      const site = api.container.lookup("site:main");
      const siteSettings = api.container.lookup('site-settings:main');
      if (!site.mobileView && !siteSettings.enable_filtered_replies_view) {
        api.reopenWidget("post-article", {
          toggleReplyAbove(goToPost = "false") {
            const replyPostNumber = this.attrs.reply_to_post_number;
            const topicUrl = this._getTopicUrl();
            if (topicUrl) {
              DiscourseURL.routeTo(`${topicUrl}/${replyPostNumber}`);
            }
            return Promise.resolve();
          }
        });
      }
    });
  },
};
