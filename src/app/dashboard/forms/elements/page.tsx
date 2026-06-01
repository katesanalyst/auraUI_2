'use client';

import { useState } from 'react';
import {
  Box, Typography, Card, Grid, TextField, FormControl, InputLabel, Select, MenuItem,
  FormControlLabel, Checkbox, Radio, RadioGroup, Switch, Slider, Chip, Divider,
} from '@mui/material';

export default function FormElementsPage() {
  const [selectVal, setSelectVal] = useState('');
  const [checked, setChecked] = useState(true);
  const [switchVal, setSwitchVal] = useState(false);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>Form Elements</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h6" mb={2}>Text Fields</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Outlined" placeholder="Default outlined" fullWidth size="small" />
              <TextField label="Filled" variant="filled" placeholder="Filled variant" fullWidth size="small" />
              <TextField label="Standard" variant="standard" placeholder="Standard variant" fullWidth />
              <TextField label="Disabled" disabled value="Disabled field" fullWidth size="small" />
              <TextField label="With Helper" helperText="Helper text goes here" fullWidth size="small" />
              <TextField label="Password" type="password" placeholder="Enter password" fullWidth size="small" />
              <TextField label="Multiline" multiline rows={3} placeholder="Type here..." fullWidth size="small" />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h6" mb={2}>Select &amp; Dropdowns</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Country</InputLabel>
                <Select value={selectVal} label="Country" onChange={(e) => setSelectVal(e.target.value)}>
                  <MenuItem value="us">United States</MenuItem>
                  <MenuItem value="uk">United Kingdom</MenuItem>
                  <MenuItem value="in">India</MenuItem>
                  <MenuItem value="de">Germany</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Multiple</InputLabel>
                <Select multiple value={['react']} label="Multiple" renderValue={(v) => v.join(', ')}>
                  <MenuItem value="react">React</MenuItem>
                  <MenuItem value="vue">Vue</MenuItem>
                  <MenuItem value="angular">Angular</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Card>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)', mt: 3 }}>
            <Typography variant="h6" mb={2}>Checkboxes &amp; Radios</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />} label="Checked" />
              <FormControlLabel control={<Checkbox />} label="Unchecked" />
              <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
              <Divider sx={{ my: 1 }} />
              <RadioGroup defaultValue="option1">
                <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                <FormControlLabel value="option3" control={<Radio disabled />} label="Disabled" />
              </RadioGroup>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h6" mb={2}>Switches</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel control={<Switch checked={switchVal} onChange={(e) => setSwitchVal(e.target.checked)} />} label="Toggle me" />
              <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Secondary color" />
              <FormControlLabel control={<Switch disabled />} label="Disabled" />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3, borderRadius: 'var(--radius-lg)' }}>
            <Typography variant="h6" mb={2}>Slider</Typography>
            <Slider defaultValue={30} sx={{ mb: 2 }} />
            <Slider defaultValue={[20, 60]} valueLabelDisplay="auto" />
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" mb={2}>Chips</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Default" />
              <Chip label="Primary" color="primary" />
              <Chip label="Secondary" color="secondary" />
              <Chip label="Success" color="success" />
              <Chip label="Outlined" variant="outlined" />
              <Chip label="Deletable" onDelete={() => {}} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
