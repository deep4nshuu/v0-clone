import React from 'react'
import { useGetProjects } from '../hooks/projects'
import { useTheme } from 'next-themes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ChevronDownIcon, ChevronLeftIcon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toogler';

const ProjectHeader = ({projectId}) => {

    const {data:project, isPending} = useGetProjects();
    const {setTheme, theme} = useTheme()

  return (
    <header className='p-2 flex justify-between items-center border-b'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant={'ghost'}
                size={'sm'}
                className={"focus-visible:ring-0 hover:bg-transparent hover:opacity-75 transition-opacity !pl-2"}
            >
                <Image
                    src={'/logo.svg'}
                    alt='Vibe'
                    width={28}
                    height={28}
                    className='shrink-0 invert dark:invert-0'
                />
                <span className='text-sm font-medium'>
                    {isPending ? <Spinner /> : project.name || "Untitled Project"}
                </span>
                <ChevronDownIcon className='size-4 ml-2' />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side={'botton'} align={'start'}>
            <DropdownMenuItem asChild>
                <Link href={'/'}>
                    <ChevronLeftIcon className='size-4' />
                    <span>Go to Dashboard</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <ModeToggle />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default ProjectHeader
