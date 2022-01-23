import React, { useEffect, useState } from "react";
import { Button, Typography, Menu, message } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useWorkspaceActions, WorkspaceSelectors } from "@redux";
import { getFeeds, removeFeed } from "requests";
import UserAvatar from "components/Avatar";
import CreateFeedModal from "./components/CreateFeedModal";
import {
  FeedWrapper,
  FeedsList,
  FeedItem,
  FeedContent,
  FeedTitle,
  CreatButtonWrapper,
  UserNameAndDateWrapper,
  StyledDropdown,
  ContentWrapper,
} from "./styles";

dayjs.extend(relativeTime);

const { Text } = Typography;

function Signup() {
  const { t } = useTranslation("feed");
  const { setFeeds } = useWorkspaceActions();
  const feeds = useSelector(WorkspaceSelectors.getFeeds);
  const user = useSelector(WorkspaceSelectors.getUser);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    const fetchFeeds = async () => {
      const feeds = await getFeeds();
      setFeeds(feeds);
    };
    fetchFeeds();
  }, []);

  const handleRemove = async (id?: string) => {
    await removeFeed(id);
    message.success(t("removed"));
    setFeeds(feeds.filter((feed) => feed._id !== id));
  };

  return (
    <FeedWrapper>
      <div>
        <CreatButtonWrapper>
          <Button onClick={showModal}>{t("createFeed")}</Button>
        </CreatButtonWrapper>

        <FeedsList>
          {feeds.map(({ content, title, createdBy, createdAt, _id }) => {
            return (
              <FeedItem key={_id}>
                <FeedTitle>
                  <UserAvatar
                    firstname={createdBy?.firstName}
                    lastname={createdBy?.lastName}
                  />
                  <UserNameAndDateWrapper>
                    <Text>
                      {createdBy?.firstName + " " + createdBy?.lastName}
                    </Text>
                    <Text type="secondary">
                      {dayjs(createdAt).format("YYYY MMM DD HH:mm")}
                    </Text>
                  </UserNameAndDateWrapper>
                  <StyledDropdown
                    overlay={
                      <Menu>
                        {user?._id === createdBy?._id && (
                          <Menu.Item
                            key={1}
                            onClick={() => handleRemove(_id)}
                            icon={<DeleteOutlined />}
                          >
                            {t("remove")}
                          </Menu.Item>
                        )}
                        <Menu.Item key={2} icon={<ShareAltOutlined />}>
                          {t("share")}
                        </Menu.Item>
                      </Menu>
                    }
                  />
                </FeedTitle>
                <FeedContent>
                  <div>
                    <Text strong>{title}</Text>
                  </div>
                  <ContentWrapper>
                    <Text>{content}</Text>
                  </ContentWrapper>
                </FeedContent>
              </FeedItem>
            );
          })}
        </FeedsList>
      </div>
      <CreateFeedModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </FeedWrapper>
  );
}

export default Signup;
