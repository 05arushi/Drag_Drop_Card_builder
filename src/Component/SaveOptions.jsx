import { useEditor } from "@craftjs/core";
import { Typography, Box, Button as MUIButton } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { toPng, toJpeg, toSvg } from 'html-to-image';

function SaveOptions({ canvasRef }) {
    const { query } = useEditor();
    const saveAsPNG = async () => {
        if (!canvasRef.current) return;
        const dataUrl = await toPng(canvasRef.current, {
            skipFonts: true
        });
        const link = document.createElement('a');
        link.download = 'export.png';
        link.href = dataUrl;
        link.click();
        handleCloseSavePopover();
    };

    const saveAsJPG = async () => {
        if (canvasRef.current === null) return;
        try {
            const dataUrl = await toJpeg(canvasRef.current, { quality: 0.95 });
            const link = document.createElement('a');
            link.download = 'my-custom-card.jpg';
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Failed to save image', error);
        }
    };

    const saveAsSVG = async () => {
        if (!canvasRef.current) return;
        const dataUrl = await toSvg(canvasRef.current);
        const link = document.createElement('a');
        link.download = 'export.svg';
        link.href = dataUrl;
        link.click();
        handleCloseSavePopover();
    };

    function inlineAllStyles(element) {
        const all = element.getElementsByTagName("*");
        for (let i = 0; i < all.length; i++) {
            const node = all[i];
            const computedStyle = getComputedStyle(node);
            let styleString = '';
            for (let prop of computedStyle) {
                styleString += `${prop}:${computedStyle.getPropertyValue(prop)};`;
            }
            node.setAttribute("style", styleString);
        }
    }

    const downloadAsHTML = async () => {
        // Inline styles
        inlineAllStyles(canvasRef.current);

        //Convert all blob/image URLs to base64
        const imgElements = canvasRef.current.querySelectorAll("img");
        for (let img of imgElements) {
            const src = img.getAttribute("src");
            if (src && src.startsWith("blob:")) {
                const blob = await fetch(src).then(res => res.blob());
                const reader = new FileReader();
                await new Promise(resolve => {
                    reader.onloadend = () => {
                        img.setAttribute("src", reader.result); // set base64
                        resolve();
                    };
                    reader.readAsDataURL(blob);
                });
            }
        }

        // Get outer HTML
        const htmlContent = canvasRef.current.outerHTML;

        //get the google fonts used in the project
        const fonts = [
            "Roboto",
            "Open Sans",
            "Montserrat",
            "Lato",
            "Playfair Display",
            "Poppins",
            "Nunito",
            "Raleway",
            "Oswald",
            "Merriweather",
            "Ubuntu",
            "Rubik",
            "Inter",
            "Bebas Neue",
            "Quicksand",
            "Muli",
            "PT Sans",
            "Work Sans",
            "Source Sans Pro",
            "Fira Sans",
            "Inconsolata",
            "Cabin",
            "Anton",
            "Noto Sans",
            "Heebo",
            "Signika",
            "Savate",
            "Mukta",
            "Josefin Sans",
            "Teko",
            "Arimo",
            "IBM Plex Sans",
            "DM Sans",
            "Karla",
            "Manrope",
            "Caveat",
            "Exo 2",
            "Honk",
            "Catamaran",
            "Playwrite Australia QLD",
            "Abel",
            "Dancing Script",
            "Crimson Text",
            "Cinzel",
            "Zilla Slab",
            "Courier New",
            "Times New Roman",
            "sans-serif",
            "serif",
            "cursive",
            "Bitcount Prop Single",
            "Bitcount",
            "Playwrite Magyarország",
            "Playfair Display"
        ];
        // Load font links
        const fontLinks = fonts.map(
            font => `<link href="https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap" rel="stylesheet">`
        ).join("\n");
        const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Exported Page</title>

          <!-- Include your fonts, styles, or icon links -->
          ${fontLinks}
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Roboto, sans-serif;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

        // Create blob and trigger download
        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'canvas_page.html';
        a.click();
        URL.revokeObjectURL(url);
    };
    return (
        <>
            <Box display="flex" flexDirection="column" gap={1} p={1}>
                <MUIButton variant="text" onClick={saveAsPNG} sx={{ color: 'white', justifyContent: 'flex-start' }}
                    startIcon={<SaveAltIcon />}>
                    PNG
                </MUIButton>
                <MUIButton variant="text" onClick={saveAsJPG} sx={{ color: 'white', justifyContent: 'flex-start' }}
                    startIcon={<SaveAltIcon />}>
                    JPG
                </MUIButton>
                <MUIButton variant="text" onClick={saveAsSVG} sx={{ color: 'white', justifyContent: 'flex-start' }}
                    startIcon={<SaveAltIcon />}>
                    SVG
                </MUIButton>
                <MUIButton variant="text" onClick={downloadAsHTML} sx={{ color: 'white', justifyContent: 'flex-start' }}
                    startIcon={<SaveAltIcon />}>
                    HTML
                </MUIButton>
            </Box>
        </>
    )
}

export default SaveOptions