import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

function Copyright() {
    return (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Sitemark
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                py: 4,
                borderTop: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                textAlign: 'center',
            }}
        >
            <Box sx={{ mb: 2 }}>
                <Link href="#" color="inherit" variant="body2" sx={{ mx: 2 }}>
                    Privacy Policy
                </Link>
                <Link href="#" color="inherit" variant="body2">
                    Terms of Service
                </Link>
            </Box>
            <Box sx={{ mb: 2 }}>
                <IconButton href="https://github.com/Codey001/techMed" aria-label="GitHub">
                    <GitHubIcon />
                </IconButton>
                <IconButton href="https://twitter.com/" aria-label="Twitter">
                    <TwitterIcon />
                </IconButton>
                <IconButton href="https://www.linkedin.com/" aria-label="LinkedIn">
                    <LinkedInIcon />
                </IconButton>
            </Box>
            <Copyright />
        </Box>
    );
}
