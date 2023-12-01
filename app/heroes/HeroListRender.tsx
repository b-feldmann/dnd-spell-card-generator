"use client";

import { List } from "antd";
import SelectHeroButton from "../components/SelectHeroButton/SelectHeroButton";

export default function HeroListRender({
  heroes,
}: {
  heroes: { name: string }[];
}) {
  // console.log(heroes);

  return (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={heroes}
      renderItem={(hero) => (
        <List.Item className="!p-0">
          <SelectHeroButton heroName={hero.name} />
        </List.Item>
      )}
    />
  );
}
