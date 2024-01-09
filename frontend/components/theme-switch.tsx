"use client";

import { FC } from "react";
import { Button, Switch, Tabs, Tab, Tooltip, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { FaCircleHalfStroke, FaMoon, FaSliders, FaSun } from "react-icons/fa6"


export const ThemeSwitch: FC = () => {
	const { theme, setTheme } = useTheme();
	const isSSR = useIsSSR();

	return (
		<Popover backdrop="opaque">
			<Tooltip content="Set Theme">
				<div className="max-w-fit"> {/* https://github.com/nextui-org/nextui/issues/1265#issuecomment-1666527084 */}
					<PopoverTrigger>

						<Button isIconOnly>
							<FaCircleHalfStroke />
						</Button>
					</PopoverTrigger>
				</div>
			</Tooltip>
			<PopoverContent>
				<div className="px-1 py-2">
					<div className="text-small font-bold pb-3">Set Theme</div>
					<Tooltip content="Light | System | Dark" showArrow>
						<Tabs
							aria-label="Options"
							fullWidth
							variant="solid"
							// classNames={{
							// 	tabList: "bg-default",
							// 	cursor: "bg-primary"
							// }}
							selectedKey={theme}
							onSelectionChange={(key) => setTheme(key as string)}
						>
							<Tab
								key="light"
								title={<FaSun className="text-yellow-600" />}
							/>
							<Tab
								key="system"
								title={<FaSliders />}
							/>
							<Tab
								key="dark"
								title={<FaMoon className="text-blue-500" />}
							/>
						</Tabs>
					</Tooltip>
				</div>
			</PopoverContent>
		</Popover>
	);
};
