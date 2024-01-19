import { Allotment, LayoutPriority } from "allotment"
import { use, useEffect, useState } from "react"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ThemeSwitch } from "../theme-switch"
import { FaBars, FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, ScrollShadow } from "@nextui-org/react"


interface SidebarLayoutProps {
  leftSidebar?: React.ReactNode
  children: React.ReactNode
}

const SidebarLayout = ({ leftSidebar, children }: SidebarLayoutProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(true)

  function handleResize() {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640)
    }
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize);
    return () => {
      // remove event listener when the component is unmounted to not cause any memory leaks
      // otherwise the event listener will continue to be active
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  useEffect(() => {
    handleResize()
  }, [isMobile]);

  return (
    <div className='w-full h-full'>
      {
        isMobile ?
          <>
            <button
              className="absolute z-50 rounded-xl w-10 h-10 top-4 left-4 text-default-600 flex items-center justify-center border border-default-600 bg-default-50/10 hover:bg-default-50 hover:scale-125 transition backdrop-blur-sm shadow-lg"
              onClick={() => setSidebarVisible(!sidebarVisible)}
            >
              <FaBars />
            </button>

            <Modal
              className="overflow-hidden bg-default-100"
              isOpen={sidebarVisible}
              onOpenChange={setSidebarVisible}
              scrollBehavior="inside"
              backdrop="blur"
            >
              <ModalContent>
                <ModalBody className="p-0">
                  <ScrollShadow>
                    {leftSidebar}
                  </ScrollShadow>
                </ModalBody>
              </ModalContent>
            </Modal>

            {/* <Sheet>
              <SheetTrigger className="absolute z-50 rounded-xl w-10 h-10 top-4 left-4 text-default-600 flex items-center justify-center bg-default-50/10 hover:bg-default-50 hover:scale-125 transition backdrop-blur-sm shadow-lg">
                <FaBars />
              </SheetTrigger>
              <SheetContent side='left' className="p-0">
                {leftSidebar}
              </SheetContent>
            </Sheet> */}


            {children}
          </>
          :
          <Allotment
            proportionalLayout={false}
            onChange={(sizes: number[]) => {
              if (sizes.length > 0)
                setSidebarVisible(sizes[0] > 0)
            }}
          >
            <Allotment.Pane minSize={200} preferredSize={300} snap priority={LayoutPriority.Low} visible={sidebarVisible} className="bg-default-100">

              {leftSidebar}

            </Allotment.Pane>

            <Allotment.Pane minSize={400} priority={LayoutPriority.High}>
              <button
                className='absolute left-2 top-1/2 -translate-y-1/2 z-50 w-4 h-8 rounded-full text-tiny text-default-600 flex items-center justify-center bg-default-50/10 hover:bg-default-50 hover:scale-125 transition shadow-lg'
                onClick={() => setSidebarVisible(!sidebarVisible)}
              >
                {sidebarVisible ? <FaChevronLeft /> : <FaChevronRight />}
              </button>


              {children}

            </Allotment.Pane>
          </Allotment>
      }
    </div>
  )
}

export { SidebarLayout }