"use server";

import { dndClasses, races } from "@/types/types";
import { PrismaClient } from "@prisma/client";
import { Button, Form, Input, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();
export type FieldType = {
  name: string;
  raceName: string;
  class: string;
};

export async function createHero(formData: FieldType) {
  "use server";

  const { name, raceName } = formData;

  const connectOrCreateClasses = dndClasses.map((dndClass) => {
    return {
      level: 0,
      class: {
        connect: {
          name: dndClass,
        },
      },
    };
  });

  await prisma.hero.create({
    data: {
      name: name,
      race: {
        connect: {
          name: raceName,
        },
      },
      classes: {
        create: connectOrCreateClasses,
      },
    },
  });

  revalidatePath("/");
}

export default async function CreateHeroForm() {
  const buttonItemLayout = { wrapperCol: { span: 14, offset: 4 } };

  return (
    <Form
      className="m-4"
      name="basic"
      onFinish={createHero}
      layout="horizontal"
      autoComplete="off"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <FormItem<FieldType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </FormItem>
      <FormItem<FieldType>
        label="Race "
        name="raceName"
        rules={[{ required: true, message: "Please input your race!" }]}
      >
        <Select
          className="w-full"
          options={races.map((race) => {
            return { value: race, label: race };
          })}
        />
      </FormItem>
      <FormItem {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">
          Create Hero
        </Button>
      </FormItem>
    </Form>
  );
}
