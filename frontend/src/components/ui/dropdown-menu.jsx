import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = ({ children, ...props }) => (
  <DropdownMenuPrimitive.Content {...props} className="bg-white rounded-md shadow-lg p-2 mt-2">
    {children}
  </DropdownMenuPrimitive.Content>
);
export const DropdownMenuItem = ({ children,className="", ...props }) => (
  <DropdownMenuPrimitive.Item {...props} className={`p-2 rounded-md cursor-pointer hover:bg-gray-100 ${className}`}>
    {children}
  </DropdownMenuPrimitive.Item>
);
