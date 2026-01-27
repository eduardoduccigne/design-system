"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

export default function CarouselPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Carousel</h1>
        <p className="text-muted-foreground">
          A carousel with motion and swipe built using Embla.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Carousel className="w-full max-w-xs">
  <CarouselContent>
    {items.map((_, index) => (
      <CarouselItem key={index}>
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl font-semibold">{index + 1}</span>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}</code>
        </pre>
      </section>

      {/* Multiple Items */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Multiple Items</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent className="-ml-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-2xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
  {/* Shows 2 items on md, 3 items on lg */}
</CarouselItem>`}</code>
        </pre>
      </section>

      {/* Orientation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Vertical Orientation</h2>
        <div className="p-6 bg-card rounded-lg border">
          <Carousel
            opts={{ align: "start" }}
            orientation="vertical"
            className="w-full max-w-xs mx-auto"
          >
            <CarouselContent className="-mt-1 h-[200px]">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="pt-1 md:basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-6">
                        <span className="text-3xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Carousel orientation="vertical" className="w-full max-w-xs">
  <CarouselContent className="-mt-1 h-[200px]">
    {/* items */}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}</code>
        </pre>
      </section>

      {/* Components */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Components</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Component</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">Carousel</td>
                <td className="py-2 text-muted-foreground">The root component</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CarouselContent</td>
                <td className="py-2 text-muted-foreground">Container for carousel items</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CarouselItem</td>
                <td className="py-2 text-muted-foreground">Individual carousel slide</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CarouselPrevious</td>
                <td className="py-2 text-muted-foreground">Previous slide button</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">CarouselNext</td>
                <td className="py-2 text-muted-foreground">Next slide button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Prop</th>
                <th className="text-left py-2 pr-4">Type</th>
                <th className="text-left py-2 pr-4">Default</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">orientation</td>
                <td className="py-2 pr-4 font-mono text-xs">horizontal | vertical</td>
                <td className="py-2 pr-4 font-mono text-xs">horizontal</td>
                <td className="py-2 text-muted-foreground">Carousel direction</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">opts</td>
                <td className="py-2 pr-4 font-mono text-xs">EmblaOptionsType</td>
                <td className="py-2 pr-4 font-mono text-xs">-</td>
                <td className="py-2 text-muted-foreground">Embla carousel options</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Touch/swipe support on mobile</li>
          <li>Keyboard navigation</li>
          <li>Horizontal and vertical orientations</li>
          <li>Multiple items per view</li>
          <li>Loop option available via Embla opts</li>
        </ul>
      </section>
    </div>
  )
}
