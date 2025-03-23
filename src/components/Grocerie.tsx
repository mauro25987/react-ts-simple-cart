interface GrocerieProp extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
  onClick: React.MouseEventHandler<HTMLLIElement>
}

export default function Grocerie({ children, onClick, ...res }: GrocerieProp) {
  return (
    <li onClick={onClick} {...res}>
      {children}
    </li>
  )
}
