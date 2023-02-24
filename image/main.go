package main

import (
	"fmt"

	"github.com/fogleman/gg"
	"github.com/golang/freetype/truetype"
	"golang.org/x/image/font/gofont/goregular"
)

func main() {
    // 设置字体
    font, err := truetype.Parse(goregular.TTF)
    if err != nil {
        panic(err)
    }

    // 设置画布
    width, height := 800, 600
    dc := gg.NewContext(width, height)
    dc.SetRGB(1, 1, 1)
    dc.Clear()

    // 设置字体样式
    dc.SetFontFace(truetype.NewFace(font, &truetype.Options{
        Size: 16,
    }))
    dc.SetRGB(0, 0, 0)

    // 代码
    code := `
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`

    // 写入代码
    dc.DrawStringWrapped(code, 50, 50, 0, 0, float64(width-100), 1.5, gg.AlignLeft)

    // 保存为PNG文件
    if err := dc.SavePNG("code.png"); err != nil {
        panic(err)
    }

    fmt.Println("Code image generated successfully!")
}
