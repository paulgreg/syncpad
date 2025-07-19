import s from './Icon.module.css'
import Home from '../assets/home.svg?react'
import List from '../assets/list.svg?react'
import Plus from '../assets/plus.svg?react'

type IconProps = {
  icon: 'home' | 'plus' | 'list'
}

const getIcon = (icon: string) => {
  switch (icon) {
    case 'home':
      return <Home />
    case 'list':
      return <List />
    case 'plus':
      return <Plus />
  }
}

const Icon: React.FC<IconProps> = ({ icon }) => {
  const SVG = getIcon(icon)

  if (!SVG) return <></>

  return <span className={s.root}>{SVG}</span>
}

export default Icon
