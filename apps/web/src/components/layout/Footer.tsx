const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-5 text-center text-neutral-600">
      <div className="container">
        <p>&copy; {currentYear} CampZone</p>
      </div>
    </footer>
  );
};

export default Footer;
