import {colors} from '../app/utils/colors'

function Colors(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Color Settings</Text>}>
        <ColorSelect
          settingsKey="color_theme"
          colors={colors}
        />
      </Section>
      <TextInput
        label="Heart rate zone - inferior limit"
        title="Heart rate zone - inferior limit"
        settingsKey="heart_rate_zone_il"
      />
      <TextInput
        label="Heart rate zone - superior limit"
        title="Heart rate zone - superior limit"
        settingsKey="heart_rate_zone_sl"
      />
    </Page>
  );
}

registerSettingsPage(Colors);