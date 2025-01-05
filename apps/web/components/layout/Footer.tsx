const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-5 text-zinc-500 text-center">
      <p>&copy; {currentYear} YelpCamp</p>
    </footer>
  );
};

export default Footer;
