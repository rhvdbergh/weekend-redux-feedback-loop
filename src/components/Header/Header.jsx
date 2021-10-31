import { Typography } from '@mui/material';

// a header for the whole app
// displays different titles (and optional subtitles)
// depending on the props passed down
function Header({ title, subtitle }) {
  return (
    <header className="App-header">
      <Typography variant="h1">{title}</Typography>
      {/* A subtitle will only display if optionally passed down through props */}
      {subtitle && <Typography variant="h6">{subtitle}</Typography>}
    </header>
  );
}

export default Header;
