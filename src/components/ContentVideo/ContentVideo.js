import React from "react";
import Verify from "~/assets/images/verify.svg";
import { FaHeart, FaCommentDots, FaShare, FaMusic } from "react-icons/fa";
import Button from "~/components/Button";
import styles from "./ContentVideo.module.scss";
import { MENU_ITEMS_SHARE } from "~/data/dataMenu";
import Menu from "~/components/Popper/Menu/Menu";
import Image from "../Image/Image";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Video from "~/components/ContentVideo/Video/";
import { config } from "~/config";

function ContentVideo({ data }) {
  const user = data.user;
  const profileLink = config.routes.profileLink(user.nickname);
  const time = data.meta.playtime_seconds;

  return (
    <div>
      <div className={styles.suggest_item}>
        <Link to={profileLink}>
          <Image className={styles.avatar} src={user.avatar} alt="" />
        </Link>
        <div className={styles.content}>
          <div className={styles.info_containter}>
            <div className={styles.info}>
              <div className={styles.author_container}>
                <div className={styles.author}>
                  <Link to={profileLink}>
                    <h3 className={styles.username}>{user.nickname}</h3>
                    {user.tick && <Image src={Verify} alt="" />}
                    <h3 className={styles.name}>
                      {user.first_name} {user.last_name}
                    </h3>
                  </Link>
                </div>
              </div>
              <span className={styles.video_desc}>{data.description}</span>
              <h4 className={styles.video_music}>
                <FaMusic className={styles.icon_music} />
                {data.music ||
                  `Nhạc nền - ${user.first_name} ${user.last_name}`}
              </h4>
            </div>
            {user.is_follow ? (
              <Button
                outline
                className={`${styles.follow_button} ${styles.followed}`}
              >
                Following
              </Button>
            ) : (
              <Button
                outline
                className={`${styles.follow_button} ${styles.follow}`}
              >
                Follow
              </Button>
            )}
          </div>
          <div className={styles.video_wrapper}>
            <div className={styles.video_card}>
              <Video time={time} src={data.file_url} loop muted autoPlay />
            </div>
            <div className={styles.action_items}>
              <div className={styles.action_button}>
                <div
                  className={
                    user.is_liked
                      ? `${styles.icon} ${styles.liked}`
                      : `${styles.icon}`
                  }
                >
                  <FaHeart />
                </div>
                <strong className={styles.count}>{data.likes_count}</strong>
              </div>
              <div className={styles.action_button}>
                <div className={styles.icon}>
                  <FaCommentDots />
                </div>
                <strong className={styles.count}>{data.comments_count}</strong>
              </div>
              <div className={styles.action_button}>
                <div className={styles.menu_share}>
                  <Menu items={MENU_ITEMS_SHARE} right>
                    <div className={styles.icon}>
                      <FaShare />
                    </div>
                  </Menu>
                </div>
                <strong className={styles.count}>{data.shares_count}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className={styles.hr} />
    </div>
  );
}

ContentVideo.prototype = {
  data: PropTypes.object.isRequired,
};

export default ContentVideo;
