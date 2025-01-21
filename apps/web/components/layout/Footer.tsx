const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-5 text-zinc-500 text-center">
      <div className="container">
        <p>&copy; {currentYear} YelpCamp</p>
      </div>
    </footer>
  );
};

export default Footer;
