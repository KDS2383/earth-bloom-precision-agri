
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings } from "lucide-react";
import { UserProfile } from '@/services/firebase/userService';

interface PreferencesSectionProps {
  userData: UserProfile | null;
  onUpdate: (data: Partial<UserProfile>) => void;
}

const PreferencesSection = ({ userData, onUpdate }: PreferencesSectionProps) => {
  const [emailNotifications, setEmailNotifications] = useState(userData?.preferences?.emailNotifications || false);
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>(userData?.preferences?.temperatureUnit || 'celsius');
  const [darkMode, setDarkMode] = useState(userData?.preferences?.darkMode || false);

  // Update local state when userData changes
  useEffect(() => {
    if (userData?.preferences) {
      setEmailNotifications(userData.preferences.emailNotifications || false);
      setTemperatureUnit(userData.preferences.temperatureUnit || 'celsius');
      setDarkMode(userData.preferences.darkMode || false);
    }
  }, [userData]);

  const handleEmailNotificationsChange = (checked: boolean) => {
    setEmailNotifications(checked);
    updatePreferences('emailNotifications', checked);
  };

  const handleTemperatureUnitChange = (value: string) => {
    const unit = value as 'celsius' | 'fahrenheit';
    setTemperatureUnit(unit);
    updatePreferences('temperatureUnit', unit);
  };

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    updatePreferences('darkMode', checked);
  };

  const updatePreferences = (field: string, value: any) => {
    onUpdate({
      preferences: {
        ...(userData?.preferences || { emailNotifications: false, temperatureUnit: 'celsius', darkMode: false }),
        [field]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          User Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive updates about your farm and recommendations
            </p>
          </div>
          <Switch 
            checked={emailNotifications}
            onCheckedChange={handleEmailNotificationsChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Temperature Unit</Label>
          <Select 
            value={temperatureUnit}
            onValueChange={handleTemperatureUnitChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select temperature unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="celsius">Celsius (°C)</SelectItem>
                <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Dark Mode</Label>
            <p className="text-sm text-muted-foreground">
              Switch between light and dark theme
            </p>
          </div>
          <Switch 
            checked={darkMode}
            onCheckedChange={handleDarkModeChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesSection;
