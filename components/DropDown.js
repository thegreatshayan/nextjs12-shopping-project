import Link from "next/link";

const DropDown = ({ href, children, ...rest }) => {
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
};

export default DropDown;
