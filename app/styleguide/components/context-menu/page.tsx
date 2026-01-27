"use client"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ContextMenuPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Context Menu</h1>
        <p className="text-muted-foreground">
          Displays a menu to the user — such as a set of actions or functions — triggered by right-clicking.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"`}</code>
        </pre>
      </section>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Right-click on the area below to open the context menu.
        </p>
        <div className="p-6 bg-card rounded-lg border">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem inset>
                Back
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset disabled>
                Forward
                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset>
                Reload
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem>
                    Save Page As...
                    <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                  <ContextMenuItem>Name Window...</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Developer Tools</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked>
                Show Bookmarks Bar
                <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuRadioGroup value="pedro">
                <ContextMenuLabel inset>People</ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
                <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<ContextMenu>
  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-64">
    <ContextMenuItem inset>
      Back
      <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem inset disabled>
      Forward
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked>
      Show Bookmarks Bar
    </ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>`}</code>
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
                <td className="py-2 pr-4 font-mono text-xs">ContextMenu</td>
                <td className="py-2 text-muted-foreground">Root component</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ContextMenuTrigger</td>
                <td className="py-2 text-muted-foreground">Area that triggers the menu on right-click</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ContextMenuContent</td>
                <td className="py-2 text-muted-foreground">The menu container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ContextMenuItem</td>
                <td className="py-2 text-muted-foreground">A menu item</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ContextMenuCheckboxItem</td>
                <td className="py-2 text-muted-foreground">Toggleable checkbox item</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ContextMenuRadioGroup</td>
                <td className="py-2 text-muted-foreground">Group for radio items</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ContextMenuRadioItem</td>
                <td className="py-2 text-muted-foreground">Radio item</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ContextMenuLabel</td>
                <td className="py-2 text-muted-foreground">Non-interactive label</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ContextMenuSeparator</td>
                <td className="py-2 text-muted-foreground">Visual separator</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ContextMenuSub</td>
                <td className="py-2 text-muted-foreground">Submenu container</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono text-xs">ContextMenuShortcut</td>
                <td className="py-2 text-muted-foreground">Keyboard shortcut hint</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>File/folder operations (copy, paste, delete)</li>
          <li>Rich text editor formatting options</li>
          <li>Image/canvas editing tools</li>
          <li>Table row/cell actions</li>
          <li>Custom right-click menus for specific elements</li>
        </ul>
      </section>
    </div>
  )
}
