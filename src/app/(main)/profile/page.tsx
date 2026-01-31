import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile');
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <PageHeader>
        <PageHeaderTitle>Profile & Settings</PageHeaderTitle>
        <PageHeaderDescription>
          Manage your personal information, integrations, and injury history.
        </PageHeaderDescription>
      </PageHeader>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                        {profileImage && <AvatarImage src={profileImage.imageUrl} alt={profileImage.description} data-ai-hint={profileImage.imageHint} />}
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Picture</Button>
                </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Alex Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="alex.doe@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sport">Primary Sport</Label>
                <Input id="sport" defaultValue="Running" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sleep-tracker">Sleep Tracker</Label>
                <Switch id="sleep-tracker" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="hrv-data">HRV Data</Label>
                <Switch id="hrv-data" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="smart-band">Smart Band</Label>
                <Switch id="smart-band" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Injury History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your past injuries help us make better predictions.
              </p>
              <Button variant="outline">Manage Injury History</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
