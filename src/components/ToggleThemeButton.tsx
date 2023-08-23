import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from 'next-themes';

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className='w-fit justify-end text-[16px] sm:mr-3'
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
    >
      {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </button>
  );
};

export default ToggleThemeButton;
