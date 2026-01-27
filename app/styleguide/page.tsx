"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, CheckCircle2, Info, AlertTriangle, Sun, Moon } from "lucide-react"

function ColorSwatch({
  name,
  variable,
  className
}: {
  name: string
  variable: string
  className?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`w-full h-16 rounded-lg border border-border ${className}`}
        style={{ backgroundColor: `var(${variable})` }}
      />
      <div className="text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-muted-foreground text-xs font-mono">{variable}</p>
      </div>
    </div>
  )
}

function Section({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

function SubSection({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-muted-foreground">{title}</h3>
      {children}
    </div>
  )
}

export default function StyleguidePage() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="p-8 space-y-16 max-w-6xl">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight">Design Tokens</h1>
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {isDark ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
        <p className="text-muted-foreground text-lg">
          Foundation design tokens extracted from the design system. These tokens define colors, typography, spacing, and other visual properties.
        </p>
      </div>

      {/* Core Colors */}
      <Section title="Core Colors">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <ColorSwatch name="Background" variable="--background" />
          <ColorSwatch name="Foreground" variable="--foreground" />
          <ColorSwatch name="Card" variable="--card" />
          <ColorSwatch name="Card Foreground" variable="--card-foreground" />
          <ColorSwatch name="Popover" variable="--popover" />
          <ColorSwatch name="Popover Foreground" variable="--popover-foreground" />
          <ColorSwatch name="Primary" variable="--primary" />
          <ColorSwatch name="Primary Foreground" variable="--primary-foreground" />
          <ColorSwatch name="Secondary" variable="--secondary" />
          <ColorSwatch name="Secondary Foreground" variable="--secondary-foreground" />
          <ColorSwatch name="Muted" variable="--muted" />
          <ColorSwatch name="Muted Foreground" variable="--muted-foreground" />
          <ColorSwatch name="Accent" variable="--accent" />
          <ColorSwatch name="Accent Foreground" variable="--accent-foreground" />
          <ColorSwatch name="Destructive" variable="--destructive" />
          <ColorSwatch name="Border" variable="--border" />
          <ColorSwatch name="Input" variable="--input" />
          <ColorSwatch name="Ring" variable="--ring" />
        </div>
      </Section>

      {/* Grey Scale */}
      <Section title="Grey Scale">
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-11 gap-4">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
            <div key={shade} className="flex flex-col gap-2">
              <div
                className="w-full aspect-square rounded-lg border border-border"
                style={{ backgroundColor: `var(--grey-${shade})` }}
              />
              <p className="text-xs font-mono text-center text-muted-foreground">{shade}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Semantic Colors */}
      <Section title="Semantic Colors">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div
              className="w-full h-16 rounded-lg"
              style={{ backgroundColor: "var(--success)" }}
            />
            <p className="font-medium">Success</p>
            <p className="text-muted-foreground text-xs font-mono">--success</p>
          </div>
          <div className="space-y-2">
            <div
              className="w-full h-16 rounded-lg"
              style={{ backgroundColor: "var(--warning)" }}
            />
            <p className="font-medium">Warning</p>
            <p className="text-muted-foreground text-xs font-mono">--warning</p>
          </div>
          <div className="space-y-2">
            <div
              className="w-full h-16 rounded-lg"
              style={{ backgroundColor: "var(--destructive)" }}
            />
            <p className="font-medium">Error / Destructive</p>
            <p className="text-muted-foreground text-xs font-mono">--destructive</p>
          </div>
          <div className="space-y-2">
            <div
              className="w-full h-16 rounded-lg"
              style={{ backgroundColor: "var(--info)" }}
            />
            <p className="font-medium">Info</p>
            <p className="text-muted-foreground text-xs font-mono">--info</p>
          </div>
        </div>
      </Section>

      {/* AI Feature Colors */}
      <Section title="AI Feature Colors">
        <p className="text-muted-foreground mb-6">
          Special gradient used to distinguish AI-powered features. Applied to buttons, text links, and icons with the sparkle icon.
        </p>
        <div className="space-y-6">
          {/* Gradient Preview */}
          <div className="space-y-2">
            <div
              className="w-full h-20 rounded-lg"
              style={{ background: "var(--ai-gradient)" }}
            />
            <p className="font-medium">AI Gradient</p>
            <p className="text-muted-foreground text-xs font-mono">--ai-gradient</p>
          </div>

          {/* Individual Colors */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <div
                className="w-full h-16 rounded-lg"
                style={{ backgroundColor: "var(--ai-start)" }}
              />
              <p className="font-medium">AI Start</p>
              <p className="text-muted-foreground text-xs font-mono">--ai-start</p>
            </div>
            <div className="space-y-2">
              <div
                className="w-full h-16 rounded-lg"
                style={{ backgroundColor: "var(--ai-mid)" }}
              />
              <p className="font-medium">AI Mid</p>
              <p className="text-muted-foreground text-xs font-mono">--ai-mid</p>
            </div>
            <div className="space-y-2">
              <div
                className="w-full h-16 rounded-lg"
                style={{ backgroundColor: "var(--ai-end)" }}
              />
              <p className="font-medium">AI End</p>
              <p className="text-muted-foreground text-xs font-mono">--ai-end</p>
            </div>
          </div>

          {/* Usage Examples */}
          <SubSection title="Button Variants">
            <div className="flex flex-wrap items-center gap-4 p-6 bg-card rounded-lg border">
              <Button variant="ai">
                <svg viewBox="0 0 80 80" fill="currentColor">
                  <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
                </svg>
                <span>AI</span>
              </Button>
              <Button variant="ai-secondary">
                <svg viewBox="0 0 80 80" fill="currentColor">
                  <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
                </svg>
                AI Secondary
              </Button>
              <Button variant="ai-outline">
                <svg viewBox="0 0 80 80" fill="currentColor">
                  <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
                </svg>
                AI Outline
              </Button>
              <Button variant="ai-ghost">
                <svg viewBox="0 0 80 80" fill="currentColor">
                  <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
                </svg>
                AI Ghost
              </Button>
              <Button variant="ai-link">
                <svg viewBox="0 0 80 80" fill="currentColor">
                  <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
                </svg>
                AI Link
              </Button>
            </div>
          </SubSection>

          <SubSection title="Other Elements">
            <div className="flex flex-wrap items-center gap-4 p-6 bg-card rounded-lg border">
              <Badge className="bg-ai-gradient-static text-white border-0">AI Badge</Badge>
              <span className="text-ai-gradient font-semibold flex items-center gap-1">
                <svg className="w-4 h-4" viewBox="0 0 80 80" fill="url(#ai-icon-gradient)">
                  <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
                </svg>
                AI-powered text
              </span>
            </div>
          </SubSection>

          {/* Utility Classes */}
          <SubSection title="Utility Classes">
            <div className="p-4 bg-card rounded-lg border space-y-2">
              <p className="text-sm"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">.bg-ai-gradient</code> - Background gradient with shimmer animation</p>
              <p className="text-sm"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">.bg-ai-gradient-static</code> - Background gradient without animation</p>
              <p className="text-sm"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">.text-ai-gradient</code> - Text gradient</p>
            </div>
          </SubSection>
        </div>
      </Section>

      {/* Chart Colors */}
      <Section title="Chart Colors">
        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="space-y-2">
              <div
                className="w-full h-16 rounded-lg"
                style={{ backgroundColor: `var(--chart-${num})` }}
              />
              <p className="text-sm font-mono text-muted-foreground text-center">chart-{num}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <SubSection title="Font Family">
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <p className="font-sans text-lg">Inter (Sans-serif) - The quick brown fox jumps over the lazy dog</p>
              <p className="text-muted-foreground text-sm font-mono mt-2">font-family: var(--font-inter), sans-serif</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <p className="font-mono text-lg">Geist Mono (Monospace) - The quick brown fox jumps over the lazy dog</p>
              <p className="text-muted-foreground text-sm font-mono mt-2">font-family: var(--font-geist-mono), monospace</p>
            </div>
          </div>
        </SubSection>

        <SubSection title="Headings">
          <div className="space-y-4 p-6 bg-card rounded-lg border">
            <h1 className="text-4xl font-bold tracking-tight">Heading 1 - 36px Bold</h1>
            <h2 className="text-3xl font-bold tracking-tight">Heading 2 - 30px Bold</h2>
            <h3 className="text-2xl font-semibold">Heading 3 - 24px Semibold</h3>
            <h4 className="text-xl font-semibold">Heading 4 - 20px Semibold</h4>
            <h5 className="text-lg font-medium">Heading 5 - 18px Medium</h5>
            <h6 className="text-base font-medium">Heading 6 - 16px Medium</h6>
          </div>
        </SubSection>

        <SubSection title="Body Text">
          <div className="space-y-4 p-6 bg-card rounded-lg border">
            <p className="text-lg">Large body text - 18px regular weight. Used for important introductory paragraphs.</p>
            <p className="text-base">Base body text - 16px regular weight. The primary text size for content.</p>
            <p className="text-sm">Small body text - 14px regular weight. Used for secondary content and descriptions.</p>
            <p className="text-xs">Extra small text - 12px regular weight. Used for captions and metadata.</p>
            <p className="text-sm text-muted-foreground">Muted text - Used for secondary information and hints.</p>
          </div>
        </SubSection>
      </Section>

      {/* Border Radius */}
      <Section title="Border Radius">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6">
          {[
            { name: "sm", label: "Small", value: "calc(var(--radius) - 4px)" },
            { name: "md", label: "Medium", value: "calc(var(--radius) - 2px)" },
            { name: "lg", label: "Large", value: "var(--radius)" },
            { name: "xl", label: "XL", value: "calc(var(--radius) + 4px)" },
            { name: "2xl", label: "2XL", value: "calc(var(--radius) + 8px)" },
            { name: "3xl", label: "3XL", value: "calc(var(--radius) + 12px)" },
            { name: "full", label: "Full", value: "9999px" },
          ].map((radius) => (
            <div key={radius.name} className="space-y-2">
              <div
                className="w-full aspect-square bg-primary"
                style={{ borderRadius: radius.value }}
              />
              <p className="text-sm font-medium">{radius.label}</p>
              <p className="text-xs text-muted-foreground font-mono">rounded-{radius.name}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Shadows */}
      <Section title="Shadows">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="w-full h-24 bg-card rounded-lg shadow-sm" />
            <p className="text-sm font-medium">Shadow SM</p>
            <p className="text-xs text-muted-foreground font-mono">shadow-sm</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-24 bg-card rounded-lg shadow" />
            <p className="text-sm font-medium">Shadow</p>
            <p className="text-xs text-muted-foreground font-mono">shadow</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-24 bg-card rounded-lg shadow-md" />
            <p className="text-sm font-medium">Shadow MD</p>
            <p className="text-xs text-muted-foreground font-mono">shadow-md</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-24 bg-card rounded-lg shadow-lg" />
            <p className="text-sm font-medium">Shadow LG</p>
            <p className="text-xs text-muted-foreground font-mono">shadow-lg</p>
          </div>
        </div>
      </Section>

      {/* Components Preview */}
      <Section title="Components Preview">
        <SubSection title="Buttons">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">Standard Variants</p>
              <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">AI Variants</p>
              <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
                <Button variant="ai">
                  <svg viewBox="0 0 80 80" fill="currentColor">
                    <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
                  </svg>
                  <span>AI</span>
                </Button>
                <Button variant="ai-secondary">
                  <svg viewBox="0 0 80 80" fill="currentColor">
                    <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
                  </svg>
                  AI Secondary
                </Button>
                <Button variant="ai-outline">
                  <svg viewBox="0 0 80 80" fill="currentColor">
                    <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
                  </svg>
                  AI Outline
                </Button>
                <Button variant="ai-ghost">
                  <svg viewBox="0 0 80 80" fill="currentColor">
                    <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
                  </svg>
                  AI Ghost
                </Button>
                <Button variant="ai-link">
                  <svg viewBox="0 0 80 80" fill="currentColor">
                    <path d="M80 40C57.908 40 40 57.91 40 80C40 57.91 22.09 40 0 40C22.09 40 40 22.092 40 0C40 22.092 57.908 40 80 40Z" />
                  </svg>
                  AI Link
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">Sizes</p>
              <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon"><Sun className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </SubSection>

        <SubSection title="Badges">
          <div className="flex flex-wrap gap-4 p-6 bg-card rounded-lg border">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </SubSection>

        <SubSection title="Cards">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description with supporting text.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here. This is the main body of the card component.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>With different content.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Badge>Tag 1</Badge>
                  <Badge variant="secondary">Tag 2</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </SubSection>

        <SubSection title="Alerts">
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert with neutral styling.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Alert</AlertTitle>
              <AlertDescription>
                This is a destructive alert for errors and warnings.
              </AlertDescription>
            </Alert>
          </div>
        </SubSection>

        <SubSection title="Radio Group">
          <div className="p-6 bg-card rounded-lg border">
            <RadioGroup defaultValue="option-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-1" id="option-1" />
                <label htmlFor="option-1" className="text-sm font-medium cursor-pointer">Option 1</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-2" id="option-2" />
                <label htmlFor="option-2" className="text-sm font-medium cursor-pointer">Option 2</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-3" id="option-3" />
                <label htmlFor="option-3" className="text-sm font-medium cursor-pointer">Option 3</label>
              </div>
            </RadioGroup>
          </div>
        </SubSection>
      </Section>

      {/* Spacing */}
      <Section title="Spacing Scale">
        <div className="space-y-4">
          <p className="text-muted-foreground">Based on 4px base unit (0.25rem)</p>
          <div className="flex flex-wrap items-end gap-4 p-6 bg-card rounded-lg border">
            {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <div
                  className="bg-primary rounded"
                  style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
                />
                <span className="text-xs font-mono text-muted-foreground">{size}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Design Summary */}
      <Section title="Design Summary">
        <Card>
          <CardContent className="pt-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-muted-foreground">Primary Color</dt>
                <dd className="font-medium">#34AA6E (Brand Green)</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Font Family</dt>
                <dd className="font-medium">Inter</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Style</dt>
                <dd className="font-medium">Calm Healthcare</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Border Radius</dt>
                <dd className="font-medium">Rounded (12px base)</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm text-muted-foreground mb-2">Overall Feel</dt>
                <dd className="text-sm leading-relaxed space-y-3">
                  <p>Calm, trustworthy healthcare interface that blends clinical clarity with human warmth. Soft, intentional surfaces and gentle contrasts create a welcoming environment, while precise typography and confident structure communicate reliability and expertise.</p>
                  <p>Feels quietly advanced rather than flashy. AI-powered and agentic, yet never robotic. The system behaves like a capable collaborator, supporting professionals with clarity, anticipation and care.</p>
                  <p>Designed, not generated: every decision feels crafted, deliberate and cohesive. Nothing is default, nothing accidental. Visual restraint replaces noise, allowing content, patients and clinical decisions to remain central.</p>
                  <p>Professional enough for healthcare, warm enough for people. Calm by default. Predictable, but never boring. Timeless, systemic and focused on trust.</p>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </Section>
    </div>
  )
}
