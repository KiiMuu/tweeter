import { Grid } from '@material-ui/core';
import Siderbar from './Sidebar';

const HomeLayout: React.FC = ({ children }) => {
    return (
        <div style={{ overflow: 'hidden' }}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={2}>
                    <Siderbar />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {children}
                </Grid>
                <Grid item xs={12} sm={4}>
                    Extra Content
                </Grid>
            </Grid>
        </div>
    )
}

export default HomeLayout;