"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { SLABadge } from "@/components/ui/sla-badge"
import { ChatBubble, ChatBubbleGroup, ChatBubbleTime, DateSeparator, SystemMessage } from "@/components/ui/chat-bubble"
import { TypingIndicator } from "@/components/ui/typing-indicator"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Info, AlertTriangle, Bell, Send, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b bg-white dark:bg-zinc-900 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Nilo Design System</h1>
          <p className="text-sm text-zinc-500">Component Showcase</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-12">

        {/* Buttons Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">Buttons</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ai"><Sparkles className="w-4 h-4" /> AI Button</Button>
                  <Button variant="ai-secondary"><Sparkles className="w-4 h-4" /> AI Secondary</Button>
                  <Button variant="ai-outline"><Sparkles className="w-4 h-4" /> AI Outline</Button>
                  <Button variant="ai-ghost"><Sparkles className="w-4 h-4" /> AI Ghost</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon"><Bell /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">Badges</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <span className="text-sm text-zinc-600 mr-2">SLA Badges:</span>
                  <SLABadge variant="ok">ON TIME</SLABadge>
                  <SLABadge variant="warning">AT RISK</SLABadge>
                  <SLABadge variant="critical">OVERDUE</SLABadge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">Cards</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Standard Card</CardTitle>
                <CardDescription>This is a standard card component</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600">Card content goes here. You can put any content inside a card.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
            <Card interactive>
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover over this card to see the effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600">This card has hover and active states for clickable cards.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Inputs & Forms Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">Inputs & Forms</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled">Disabled Input</Label>
                  <Input id="disabled" placeholder="Disabled" disabled />
                </div>
                <div className="flex items-center space-x-3">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Switch id="ai-mode" variant="ai" defaultChecked />
                  <Label htmlFor="ai-mode">AI Mode</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Progress Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">Progress</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>25% Complete</span>
                </div>
                <Progress value={25} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>50% Complete</span>
                </div>
                <Progress value={50} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>75% Complete</span>
                </div>
                <Progress value={75} />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Avatars Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">Avatars</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback variant="professional">JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback variant="patient">PT</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarFallback variant="professional">LG</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tabs Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">Tabs</h2>
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-4 border rounded-lg mt-2">
                  <p className="text-sm text-zinc-600">Overview content goes here.</p>
                </TabsContent>
                <TabsContent value="analytics" className="p-4 border rounded-lg mt-2">
                  <p className="text-sm text-zinc-600">Analytics content goes here.</p>
                </TabsContent>
                <TabsContent value="settings" className="p-4 border rounded-lg mt-2">
                  <p className="text-sm text-zinc-600">Settings content goes here.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Alerts Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">Alerts</h2>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>This is a default alert message.</AlertDescription>
            </Alert>
            <Alert variant="info">
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>This is an informational alert.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your action was completed successfully.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Please review before proceeding.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong. Please try again.</AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Chat Components Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">Chat Components</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4 max-w-lg bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl">
                <DateSeparator>Today</DateSeparator>

                <ChatBubbleGroup align="start">
                  <ChatBubble variant="received">
                    Hello! How can I help you today?
                  </ChatBubble>
                  <ChatBubbleTime>10:30 AM</ChatBubbleTime>
                </ChatBubbleGroup>

                <ChatBubbleGroup align="end">
                  <ChatBubble variant="sent">
                    Hi! I have a question about my appointment.
                  </ChatBubble>
                  <ChatBubbleTime status="read">10:31 AM</ChatBubbleTime>
                </ChatBubbleGroup>

                <ChatBubbleGroup align="start">
                  <ChatBubble variant="received">
                    Of course! What would you like to know?
                  </ChatBubble>
                  <ChatBubbleTime>10:32 AM</ChatBubbleTime>
                </ChatBubbleGroup>

                <TypingIndicator />

                <SystemMessage>Session started</SystemMessage>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* All Components List */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">All Available Components</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {[
                  "Accordion", "Alert", "Alert Dialog", "Aspect Ratio", "Avatar", "Badge",
                  "Breadcrumb", "Button", "Calendar", "Card", "Carousel", "Chart",
                  "Chat Audio", "Chat Bubble", "Chat File", "Chat Image", "Chat Transcription",
                  "Checkbox", "Collapsible", "Command", "Context Menu", "Conversation Item",
                  "Count Badge", "Dialog", "Drawer", "Dropdown Menu", "File Upload", "Form",
                  "Hover Card", "Input", "Input OTP", "Label", "Menubar", "Modal",
                  "Multi Select", "Navigation Menu", "Pagination", "Popover", "Progress",
                  "Queue Item", "Quick Reply", "Radio Group", "Resizable", "Scroll Area",
                  "Select", "Separator", "Sheet", "Sidebar", "Skeleton", "SLA Badge",
                  "Slider", "Sonner", "Switch", "Table", "Tabs", "Tag", "Textarea",
                  "Toggle", "Toggle Group", "Tooltip", "Typing Indicator"
                ].map((component) => (
                  <div key={component} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300">
                    {component}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

      </main>

      <footer className="border-t bg-white dark:bg-zinc-900 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-4 text-center text-sm text-zinc-500">
          Nilo Health Design System
        </div>
      </footer>
    </div>
  )
}
