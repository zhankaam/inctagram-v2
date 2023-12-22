import { useState, type FC } from 'react'
import IconArrowBack from 'shared/assets/icons/general/arrow-back.svg'
import { Theme } from 'shared/constants/theme'
import { useTheme } from 'shared/hooks/useTheme'
import { Button } from 'shared/ui'
import { FilterImage } from './components/filterImage'
import { Filters } from './components/filters'
import { dataURLtoFile } from './lib/dataUrlToFile'
import { getModifiedImageSrc } from './lib/getModifiedImageSrc'
import cls from './styles.module.scss'

interface IProps {
    file?: File
    setFile: (value: File) => void
    onNextClick: () => void
    onPrevClick: () => void
}

export const FilterIamgeModalStep: FC<IProps> = ({ onPrevClick, file, setFile, onNextClick }) => {
    const { theme } = useTheme()
    const fill = theme === Theme.LIGHT ? '#000000' : '#ffffff'
    const [imageFilter, setImageFilter] = useState('')
    const image = file ? URL.createObjectURL(file) : ''

    async function handleChange () {
        const newImage = await getModifiedImageSrc()
        const newFile = dataURLtoFile(newImage, 'new-file.png')
        setFile(newFile)
        onNextClick()
    }
    return (
        <div className={cls.modal}>
            <header className={cls.header} >
                <IconArrowBack fill={fill} onClick={onPrevClick}/>
                <h2>Filter</h2>
                <Button onClick={handleChange}>Next</Button>
            </header>
            <div className={cls.nextContainer} >
                <FilterImage image={image} imageFilter={imageFilter} />
                <div>

                    <Filters
                    setImageFilter={setImageFilter}
                    image={image}
                    />
                </div>
            </div>

        </div>
    )
}
