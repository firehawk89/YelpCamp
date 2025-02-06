const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-5 text-center text-zinc-500">
      <div className="container">
        <p>&copy; {currentYear} YelpCamp</p>
      </div>
    </footer>
  );
};

export default Footer;
