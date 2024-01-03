import './App.css';
import React,{ useState } from 'react'


function App() {

  const [spellSet, setSpellSet] = useState(new Set());
  const [damage, setDamage] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [multipliers, setMultipliers] = useState({
    baseStat: 1.25,
    feint: 1,
    balanceBlade: 1,
    hex: 1,
    curse: 1,
  });

  const applyMultipliers = () => {
    return (
      damage *
      multipliers.baseStat *
      multipliers.feint *
      multipliers.balanceBlade *
      multipliers.hex *
      multipliers.curse
    );
  };

  function addDamage(num){
    if(damage <= 99 && num < 0){
      setDamage(0);
      return;
    }
    const updatedDamage = damage + num;
    setInputValue(updatedDamage);
    setDamage(updatedDamage);
  }
  
  function reset(){
    const updatedDamage = 0;
    setDamage(updatedDamage);
    setSpellSet(new Set());
    setInputValue('');
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

    if (event.target.value !== '') {
      setDamage(parseInt(event.target.value));
    } else {
      setDamage(0);
      setSpellSet(new Set());
    }
  };

  return (
    <div className="App">
      <div className='Damage-Section'>
        <input placeholder='Base Damage' type='number' value={inputValue} onChange={handleInputChange}
        />
        <button onClick={() => {
          addDamage(100);
        }}>+100 Damage</button>
        <button onClick={() => {
          addDamage(-100);
        }}>-100 Damage</button>
      </div>

      <div className='Spell-Section'>
        <button className='Feint' onClick={() => {
          if (!spellSet.has("Feint (70%)")) {
            setMultipliers((prev) => ({ ...prev, feint: 1.7 }));
            setSpellSet(new Set([...spellSet, "Feint (70%)"]));
          }
          else{
            setMultipliers((prev) => ({ ...prev, feint: 1 }));
            spellSet.delete("Feint (70%)");
            setSpellSet(new Set([...spellSet]))
          }
        }}/>

        <button className='BalanceBlade' onClick={() => {
          if (!spellSet.has("Balance Blade (25%)")){
            setMultipliers((prev) => ({ ...prev, balanceBlade: 1.25 }));
            setSpellSet(new Set([...spellSet, "Balance Blade (25%)"]));
          }
          else{ 
            setMultipliers((prev) => ({ ...prev, balanceBlade: 1 }));
            spellSet.delete("Balance Blade (25%)");
            setSpellSet(new Set([...spellSet]));
          }
        }}/>

        <button className='Hex' onClick={() => {
          if (!spellSet.has("Hex (30%)")) {
            setMultipliers((prev) => ({ ...prev, hex: 1.3 }));
            setSpellSet(new Set([...spellSet, "Hex (30%)"]));
          }
          else{ 
            setMultipliers((prev) => ({ ...prev, hex: 1 }));
            spellSet.delete("Hex (30%)");
            setSpellSet(new Set([...spellSet]));
          }
        }}/>

        <button className='Curse' onClick={() => {
          if (!spellSet.has("Curse (30%)")) {
            setMultipliers((prev) => ({ ...prev, curse: 1.3 }));
            setSpellSet(new Set([...spellSet, "Curse (30%)"]));
          }
          else{ 
            setMultipliers((prev) => ({ ...prev, curse: 1 }));
            spellSet.delete("Curse (30%)");
            setSpellSet(new Set([...spellSet]));
          }
        }}/>
        
      </div>
      <button onClick={() => {
        reset();
      }}>Clear</button>

      <ul>
        <li>Base Stats (25%)</li>
        {Array.from(spellSet).map(item => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>

      <h1>Total Damage: {Math.floor(applyMultipliers())}</h1>
    </div>
  );
}

export default App;
