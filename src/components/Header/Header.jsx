import { Typography } from '@mui/material';

function Header({ title, subtitle }) {
  return (
    <header className="App-header">
      <Typography variant="h1">{title}</Typography>
      {subtitle && <Typography variant="h6">{subtitle}</Typography>}
    </header>
  );
}

export default Header;
