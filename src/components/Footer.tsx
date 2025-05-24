
import { Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-4 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2025 Apoorv Mane. All rights reserved.</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Made by Apoorv Mane</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mr-2">Contact me</p>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href="mailto:apoorvmane001@gmail.com" 
                aria-label="Email"
                className="transition-transform hover:scale-110"
              >
                <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 h-8 w-8 transition-colors duration-200">
                  <Mail className="h-4 w-4" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>apoorvmane001@gmail.com</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href="https://www.instagram.com/thefloatin_cloud/profilecard/?igsh=MThjbmhjMDd4NnI3Yw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="transition-transform hover:scale-110"
              >
                <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 h-8 w-8 transition-colors duration-200">
                  <Instagram className="h-4 w-4" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Instagram</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href="https://www.linkedin.com/in/apoorvmane?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="transition-transform hover:scale-110"
              >
                <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 h-8 w-8 transition-colors duration-200">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>LinkedIn</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
};
