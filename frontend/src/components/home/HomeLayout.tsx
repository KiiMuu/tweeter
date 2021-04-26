import { Grid } from '@material-ui/core';
import Siderbar from './Siderbar';

const HomeLayout: React.FC = ({ children }) => {
    return (
        <div style={{ overflow: 'hidden' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Siderbar />
                </Grid>
                <Grid item xs={12} sm={7}>
                    {children}
                </Grid>
                <Grid item xs={12} sm={3}>
                    Extra Content
                </Grid>
            </Grid>
        </div>
    )
}

export default HomeLayout;