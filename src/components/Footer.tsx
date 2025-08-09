import { type FooterProps } from "../libs/FooterType";

export default function Footer({ year, fullName, studentId }: FooterProps) {
  return (
    <footer className="align-self-end text-center w-100">
      <p className="text-white bg-secondary p-4 m-0">
        Copyright © {year} {fullName} {studentId}
      </p>
    </footer>
  );
}