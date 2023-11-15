import { PrinterOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import Link from "next/link";

export function PrintButton({
  searchParams,
}: {
  searchParams?: string;
}) {
  return (
    <Link href={`/api/print${searchParams}`} target="_blank">
      <FloatButton
        shape="circle"
        type="primary"
        style={{ right: 94 }}
        icon={<PrinterOutlined />}
      />
    </Link>
  );
}
